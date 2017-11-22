import _ from 'lodash';
import React from 'react';
import { ListView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Header } from './common';



import Icon from 'react-native-vector-icons/Ionicons';

import uuid from 'react-native-uuid';

//import { bindActionCreators } from 'redux';

//import * as myActions from '../actions';

import { liveChatPostsFetch } from '../actions';
import ListItem from './ListItem';



class HumanAnswerChatList extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Answer',
    tabBarIcon: () => (<Icon name="ios-text" size={24} color="white" />)
  }
  componentWillMount() {
    this.props.liveChatPostsFetch();


    // pass live chat posts we have fetched from the store
    this.createDataSource(this.props.liveChatPosts);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    //console.log("NEXT PRORPS: ", nextProps.liveChatPosts);
    if (nextProps.liveChatPosts != undefined) {
      this.createDataSource(nextProps.liveChatPosts);
    }
    
  }

  createDataSource(liveChatPost) {
    //console.log("in createDataSource, liveChatPost is: ", liveChatPost);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    
    this.dataSource = ds.cloneWithRows(liveChatPost);

  }


  // pass each liveChatPost to a ListItem
  renderRow(liveChatPost) {
    //console.log("in RenderRow, liveChatPost is: ", liveChatPost);
    return (
      <View style={styles.container}>
        <ListItem liveChatPost={liveChatPost} />
      </View>
    );
    
  }

  renderSectionHeader() {
    return (
      <Header headerText={"Answer"}/>
    );
  }


  //<ListItem liveChatPost={liveChatPost}/>
      

  render() {
    return (
      <ListView 
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        renderSectionHeader={this.renderSectionHeader}
        //initialListSize: 25
      />
    );
  }
}

const mapStateToProps = (state) => {
  
  //console.log('state.liveChatPosts: ', state.liveChatPosts);

  const liveChatPosts = _.map(state.liveChatPosts, (val, uid) => {
    return { ...val, uid };
  });

  // same as liveChatPosts: liveChatPosts
  return { liveChatPosts };
};




const styles = {
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

};


export default connect(mapStateToProps, { liveChatPostsFetch })(HumanAnswerChatList);

// // access state
// const mapStateToProps = (state) => {
//   return {
//     userChatPosts: state.userChatPosts
//   }
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

// export default connect(mapStateToProps, mapDispatchToProps)(HumanAnswerChatList);
