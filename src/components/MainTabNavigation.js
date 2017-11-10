import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from 'react-navigation'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
 
class MoviesAndTV extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Movies & TV',
    tabBarIcon: () => (<Icon name="ios-chatbubbles" size={24} color="white" />)
  }
 
  render() { 
  	return (
      <View style={styles.container}>
        
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        
      </View>
    ); 
  }
}
 
class Music extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Music',
    tabBarIcon: () => (<Icon name="ios-text" size={24} color="white" />)
  }
 
  render() { 
  	return (
      <View style={styles.container}>
        
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        
      </View>
    ); 
  }
}
 
class Newsstand extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Newsstand',
    tabBarIcon: () => (<Icon name="md-person" size={24} color="white"/>)
  }
 
  render() { 
  	return (
      <View style={styles.container}>
        
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        
      </View>
    ); 
  }
}
 
// all on top are components, import them seperatly

const MainTabNavigation = TabNavigator({
  MoviesAndTV: { screen: MoviesAndTV },
  Music: { screen: Music },
  Newsstand: { screen: Newsstand }
}, {
  tabBarComponent: NavigationComponent,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    bottomNavigationOptions: {
      labelColor: 'white',
      rippleColor: 'white',
      tabs: {
        MoviesAndTV: {
          barBackgroundColor: '#37474F'
        },
        Music: {
          barBackgroundColor: '#00796B'
        },
        Newsstand: {
          barBackgroundColor: '#EEEEEE',
          labelColor: '#434343', // like in the standalone version, this will override the already specified `labelColor` for this tab
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

