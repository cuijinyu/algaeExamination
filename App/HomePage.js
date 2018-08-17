import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import HomeButton from './HomeButton';
import {
    AppRegistry,
    Text,
    View,
    Button,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
export default class HomePage extends React.Component {
    static navigationOptions = {
      tabBarLabel: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: () => (
            <Image
                    source={require('../asserts/homeAnt.png')}
                    style={{ width: 26, height: 26}}
                />
      ),
    };
  
    render() {
      return (
        <View>
          <View style={{height:200}}>

          </View>
          <View style={{flexDirection:"row"}}>
            <HomeButton text="测试" img={require("../asserts/homeAnt.png")} onPress={() => {}}></HomeButton>
            <HomeButton text="测试" img={require("../asserts/homeAnt.png")} onPress={() => {}}></HomeButton>
            <HomeButton text="测试" img={require("../asserts/homeAnt.png")} onPress={() => {}}></HomeButton>
          </View>
        </View>
      )
    }
  }