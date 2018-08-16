import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {FontAwesomeIcon, Icon} from '../node_modules/._react-native-vector-icons@5.0.0@react-native-vector-icons/FontAwesome';
import {
    AppRegistry,
    Text,
    View,
    Button,
    ScrollView,
    StyleSheet,
    Image,
  } from 'react-native';
export default class HomePage extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'HomePage',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: () => (
            <Image
                    source={require('../asserts/homeAnt.png')}
                    style={{ width: 26, height: 26}}
                />
      ),
    };
  
    render() {
      return (<Text>测试</Text>)
    }
  }