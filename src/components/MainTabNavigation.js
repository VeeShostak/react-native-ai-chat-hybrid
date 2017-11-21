import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import ChatBotChat from './ChatBotChat';
import HumanAnswerChatList from './HumanAnswerChatList';
  
 
class Profile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: () => (<Icon name="md-person" size={24} color="white"/>)
  }
 
  render() { 
  	return (
      <View style={styles.container}>
        
        <Text style={styles.instructions}>
          User profile
        </Text>
        
      </View>
    ); 
  }
}
 

const MainTabNavigation = TabNavigator({
  ChatBotChat: { screen: ChatBotChat },
  HumanAnswerChatList: { screen: HumanAnswerChatList },
  Profile: { screen: Profile }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        ChatBotChat: {
          barBackgroundColor: '#37474F'
        },
        HumanAnswerChatList: {
          barBackgroundColor: '#00796B'
        },
        Profile: {
          barBackgroundColor: '#EEEEEE',
          //labelColor: '#434343', // like in the standalone version, this will override the already specified `labelColor` for this tab
          activeLabelColor: '#212121',
          activeIcon: <Icon name="md-person" size={24} color="#212121" />
        }
      }
    }
  }
})

export default MainTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

