/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import {FontAwesomeIcon, Icon} from '../node_modules/._react-native-vector-icons@5.0.0@react-native-vector-icons/FontAwesome';
import { Sae,Fumi,Kohana,Makiko } from '../node_modules/._react-native-textinput-effects@0.4.2@react-native-textinput-effects';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,

} from 'react-native';
const Realm = require('realm');

class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>

                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

export default class About extends Component {
    constructor () {
        super();
        this.state = {
            selectedTab: 'home' 
        }
    }

    static navigationOptions = {
        tabBarLabel: 'AboutMe',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: () => (
                 <Image
                    source={require('../asserts/user.png')}
                    style={{ width: 26, height: 26}}
                /> 
        )
    };    

    render() {
        return (
            <View>
                <Text>我是一个测试</Text>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    welcom: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin: 3,
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd'
    },
});
