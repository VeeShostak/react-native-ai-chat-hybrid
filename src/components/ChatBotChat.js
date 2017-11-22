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

//import configureStore from './store';

class ChatBotChat extends React.Component {
  constructor(props) {
    super(props);

    ApiAi.setConfiguration(
      "16ef009735374933b80a27d199edc8de", ApiAi.LANG_ENGLISH
    );


  }

  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: this.props.userChatPosts
    });
  }

  // @param messages: takes message object
  onSend(messages = []) {

    // append userQuery to gifted chat messages 
    // note: returns implicit object
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const userQuery = messages[0].text;
    let machineResponded = true;
    let response = "";

    const sendRequest = () =>  {
      

      ApiAi.requestQuery(userQuery, result => {
        response = result.result.fulfillment.speech;
        
        // if bad response, route to human
        if (response === "") {
          // send to human-chat-posts, wait 10s, 

          // user id: this.props.auth.user.id available in action

          this.props.conversationPostSendToHuman({ userQuery });

        } else {

          // else we got a response, add the conversation post

            const messageObjectResponse =
            {
              _id: uuid.v4(),
              text: response,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Ai',
              },
            };
          
            

          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messageObjectResponse),
          }));

          createdAt = messageObjectResponse.createdAt;


          // NOTE: must be backwards for GiftedChat
          messagesToAdd = [messageObjectResponse, messages[0]];

          this.props.conversationPostCreate({ userQuery, response, machineResponded, createdAt }, messagesToAdd);

        }

      }, error => console.log('api.ai: ', error)); 
    };
    sendRequest();

  }
  static navigationOptions = {
    tabBarLabel: 'Chat',
    tabBarIcon: () => (<Icon name="ios-chatbubbles" size={24} color="white" />)
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatBotChat);

