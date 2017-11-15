import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { GiftedChat } from 'react-native-gifted-chat';
import ApiAi from 'react-native-api-ai';
import uuid from 'react-native-uuid';

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
      messages: [

      	{
          _id: uuid.v4(),
          text: 'How are you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Ai',
            
          },
        },
      ]
    });
  }

  // @param messages: takes message object
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const sendRequest = () =>  {
      ApiAi.requestQuery(messages[0].text, result => {
        const response = result.result.fulfillment.speech;
        

          const messageObject =
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
          messages: GiftedChat.append(previousState.messages, messageObject),
        }));
      }, error => console.error(error));
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


export default ChatBotChat;