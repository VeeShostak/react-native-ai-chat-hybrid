import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { GiftedChat } from 'react-native-gifted-chat';

//import * as myActions from '../actions';

// this.props.navigation.state.params.hello

class HumanAnswerChat extends React.Component {
render() { 
  	return (
      <View>
        
        <Text>
          TEST::::::::::: 
        </Text>
        <Text>
          TEST::::::::::: 
        </Text>
        <Text>
         {
          //console.log("ChatPost prop: ", this.props.navigation.state.params.chatPost)
          this.props.navigation.state.params.chatPost.userQuery
        }
        </Text>
        
      </View>
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

export default HumanAnswerChat;

