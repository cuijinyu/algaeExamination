import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,
    Button
} from 'react-native';
import {FontAwesomeIcon, Icon} from '../node_modules/._react-native-vector-icons@5.0.0@react-native-vector-icons/FontAwesome';
export default class Add extends React.Component {
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Add"
        />
      );
    }
  }
  
  Add.navigationOptions = {
      //tab标签
      tabBarLabel: 'Add',
      tabBarIcon: () => (
             <Image
                    source={require('../asserts/plus.png')}
                    style={{ width: 26, height: 26}}
                /> 
       )
  };