import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';

import { liveChatPostsHumanRespond } from '../actions';
import { withNavigation } from 'react-navigation';

//import * as myActions from '../actions';

// access props passed to navigation
// this.props.navigation.state.params.chatPost.userQuery



class HumanAnswerChat extends React.Component {

  state = {
    messages: [],
  };

  componentWillMount() {

    // chatPost: 
    // {responded: false, taken: false, userQuery: "sample query", uid: "UIDcGvJyy6O1gmV6kuJvK0XWfLB3"}
    const userQuery = this.props.navigation.state.params.chatPost.userQuery;

    //console.log("chatpost: ", this.props.navigation.state.params.chatPost);

    const messageObjectResponse =
    {
      _id: uuid.v4(),
      text: userQuery,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Ai',
      },
    };

    this.setState( (previousState) => ({
      messages: GiftedChat.append(previousState.messages, messageObjectResponse)
    }));
  }

  onSend(messages = []) {

    

    const respondingToUid = this.props.navigation.state.params.chatPost.uid;
    const userQuery = this.props.navigation.state.params.chatPost.userQuery;
    const humanResponse = messages[0].text;

    // checks if uuid still exitst
    this.props.liveChatPostsHumanRespond(respondingToUid, userQuery, humanResponse);

    // append response to gifted chat messages
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    this.props.navigation.navigate('Details');

  }

  render() { 
  	return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
        //bottomOffset={50}
        isAnimated={true}
        showUserAvatar={false}
        maxInputLength={200}
      />
    ); 
  }
}


// const mapStateToProps = (state) => {
//   return {LiveChatPosts: state.LiveChatPosts}
// }

// // access actions dispatch to store
// const mapDispatchToProps = (dispatch) => {
//   let actionCreators = bindActionCreators(myActions, dispatch)
//   return {
//     ...actionCreators,
//     dispatch
//     // emailChanged: () => dispatch(emailChanged()),
//   }
// }

//export default connect(mapStateToProps, mapStateToProps)(HumanAnswerChat);


export default withNavigation(connect(undefined, { liveChatPostsHumanRespond })(HumanAnswerChat));


