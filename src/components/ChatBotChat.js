import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GiftedChat } from 'react-native-gifted-chat';
import ApiAi from 'react-native-api-ai';
import uuid from 'react-native-uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as myActions from '../actions';
import { Header} from './common/Header';


import timer from 'react-native-timer';



//import configureStore from './store';

class ChatBotChat extends React.Component {
    static navigationOptions = {
    tabBarLabel: 'Chat',
    tabBarIcon: () => (<Icon name="ios-chatbubbles" size={24} color="white" />)
  }

  constructor(props) {
    super(props);

    ApiAi.setConfiguration(
      "16ef009735374933b80a27d199edc8de", ApiAi.LANG_ENGLISH
    );
  }


  state = {
    messages: [],
    responded: false,
    secondsForHuman: 21
  };

  componentWillMount() {
    this.setState({
      messages: this.props.userChatPosts
    });
  }
  componentWillUnmount() {
    timer.clearTimeout(this);
  }


  appendResponseMessageGiftedChat(text, createdAt) {
    const messageObjectResponse =
    {
      _id: uuid.v4(),
      text: text,
      createdAt: createdAt,
      user: {
        _id: 2,
        name: 'Ai',
      },
    };

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messageObjectResponse),
    }));

    return messageObjectResponse;
  }

  // TODO: Create seperate Function
  // @param messages: takes message object
  onSend(messages = []) {

    // append userQuery to gifted chat messages 
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const userQueryMessageObject = messages[0];
    const userQuery = userQueryMessageObject.text;
    let machineResponded = true;
    let response = "";

    const sendRequest = () =>  {
      ApiAi.requestQuery(userQuery, result => {
        // get response from machine
        response = result.result.fulfillment.speech;
        
        // if bad response, route to human
        if (response === "") {
          // send to live-chat-posts
          this.props.conversationPostSendToHuman({ userQuery });

          // ==========
          // START wait 10s for human to respond
          // ==========
          
          // place 20 setTimeouts into a queue so they could run the
          // getHumanResponseAndProcess function for 20 seconds, until human responded or time runs out
          // we will clear the remaining timouts if human responded
          secondsCount = this.state.secondsForHuman;
          for (let i = 1; i < secondsCount; i++) {
            // place 20 setTimeouts into a queue
            timer.setTimeout(this, 'getHumanResponseAndProcess' + i, () => {this.getHumanResponseAndProcess(i, userQueryMessageObject)}, 1000 * i);
          }

          // ==========
          // END wait 10s for human to respond
          // ==========


        } else {

          // else we got a response, add the conversation post
            
          const createdAt = new Date();
          const messageObjectResponse = this.appendResponseMessageGiftedChat(response, createdAt)

          
          messagesToAdd = [messageObjectResponse, userQueryMessageObject];

          this.props.conversationPostCreate({ userQuery, response, machineResponded }, messagesToAdd, this.props.auth.refresh_token);

        }

      }, error => console.log('api.ai: ', error)); 
    };
    
    sendRequest();

  }


  getHumanResponseAndProcess(seconds, userQueryMessageObject)  {
    this.props.humanResponseFetch();
    
    console.log('awaiting response!!!', seconds);

    // either human responded or time ran out

    if(this.props.humanResponse.responded == true) {
      // Clear timouts if responded
      timer.clearTimeout(this);
      console.log('human response: ', this.props.humanResponse.response);
      const response = this.props.humanResponse.response;
      const machineResponded = false;
      const userQuery = userQueryMessageObject.text;

      // append response from Human to giftedCHat
      createdAt = new Date();
      const messageObjectResponse = this.appendResponseMessageGiftedChat(response, createdAt);

      
      messagesToAdd = [messageObjectResponse, userQueryMessageObject];
      // add to user-chat-posts and to store (persist)
      this.props.conversationPostCreate({ userQuery, response, machineResponded }, messagesToAdd, this.props.auth.refresh_token);

      // reset human response
      const humanResponseReset = { responded: false, response: "sample"}
      this.props.humanResponseSet(humanResponseReset);

      // delete live-chat-post
      this.props.liveChatPostDelete();
      

    }
    else if(seconds+1 >= this.state.secondsForHuman && this.props.humanResponse.responded == false) {
      console.log('NO RESPONSE (timeRanOut): ', this.props.humanResponse.response);
      const machineResponded = false;
      const userQuery = userQueryMessageObject.text;
      const response = 'Sorry, I couldn\'t get that';

      // notify user nobody was able to answer by appending boilerplate message
      createdAt = new Date();
      const messageObjectResponse = this.appendResponseMessageGiftedChat(response, createdAt);

      messagesToAdd = [messageObjectResponse, userQueryMessageObject];
      // add to user-chat-posts and to store (persist)
      this.props.conversationPostCreate({ userQuery, response, machineResponded }, messagesToAdd, this.props.auth.refresh_token);
      

      // reset human response
      const humanResponseReset = { responded: false, response: "sample"}
      this.props.humanResponseSet(humanResponseReset);

      // delete live-chat-post
      this.props.liveChatPostDelete();


    } 
  }
  


  render() {
    return (
      <View style={{flex: 1}}>
        <Header headerText={"Chat"}/>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          bottomOffset={50}
          isAnimated={true}
          showUserAvatar={false}
          maxInputLength={200}
        />
      </View>
    );
  }

}

// access state
const mapStateToProps = (state) => {
  return {
    userChatPosts: state.userChatPosts,
    humanResponse: state.humanResponse,
    auth: state.auth
  }
}

// access actions dispatch to store
const mapDispatchToProps = (dispatch) => {
  let actionCreators = bindActionCreators(myActions, dispatch)
  return {
    ...actionCreators,
    dispatch
    // emailChanged: () => dispatch(emailChanged()),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(ChatBotChat));

