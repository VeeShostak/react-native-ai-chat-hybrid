import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { GiftedChat } from 'react-native-gifted-chat';
import ApiAi from 'react-native-api-ai';
import uuid from 'react-native-uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as myActions from '../actions';
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
    // this.setState({
    //   messages: [

    //   	{
    //       _id: uuid.v4(),
    //       text: 'How are you?',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'Ai',
            
    //       },
    //     },
    //   ]
    // });

    //console.error(this.props.userChatPosts);

    this.setState({
      messages: this.props.userChatPosts
    });
  }

  // @param messages: takes message object
  onSend(messages = []) {

    // append userQuery to gifted chat messages
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
        if (response == "") {
          // send to live-chat-posts, wait 10s, 

        }

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

        // NOTE: must be backwards for GiftedChat
        messagesToAdd = [messageObjectResponse, messages[0]];

        this.props.conversationPostCreate({ userQuery, response, machineResponded }, messagesToAdd);

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
    );
  }

}

// access state
const mapStateToProps = (state) => {
  return {
    userChatPosts: state.userChatPosts
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

