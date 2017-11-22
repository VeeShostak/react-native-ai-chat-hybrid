import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { withNavigation } from 'react-navigation';

import { CardSection } from './common';


class ListItem extends React.Component {

  onRowPress() {
  	// change to reply screen
    //console.log("prop to be passed: ", this.props.liveChatPost);
    this.props.navigation.navigate('HumanAnswerChat', {chatPost: this.props.liveChatPost});

  	// send navigation to the action as prop, also send the conversation object

    //Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {

    const { userQuery } = this.props.liveChatPost;
    
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          
          <CardSection style={styles.cardSectionContainer}>
            <Text 
            style={styles.titleStyle}
            >
              {userQuery}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    backgroundColor: '#F0F0F0',
  },
  cardSectionContainer: {
    padding: 15,
    backgroundColor: '#F0F0F0'
  }
};

export default withNavigation(ListItem);
