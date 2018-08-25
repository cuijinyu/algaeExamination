/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
import Copyright from './Copyright.js';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import  ImagePicker  from 'react-native-image-picker';
let options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

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
        tabBarLabel: 'About',
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
                <View>
                    <Text style={{fontSize:28,marginLeft:15,marginTop:5}}>About</Text>
                    <Text style={{marginLeft:15,marginRight:15,marginTop:10,marginBottom:20}}>AlgaeExamination:An application for algae scientific information entry</Text>
                </View>
                <CustomButton text="internationalization" onPress={() => {
                    ImagePicker.showImagePicker(options, (response) => {
                        console.log('Response = ', response);
                      
                        if (response.didCancel) {
                          console.log('User cancelled image picker');
                        }
                        else if (response.error) {
                          console.log('ImagePicker Error: ', response.error);
                        }
                        else if (response.customButton) {
                          console.log('User tapped custom button: ', response.customButton);
                        }
                        else {
                          let source = { uri: response.uri };
                      
                          // You can also display the image using data:
                          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                      
                          this.setState({
                            avatarSource: source
                          });
                        }
                      });
                }}></CustomButton>
                <CustomButton text="about us" onPress={() => {
                    this.props.navigation.navigate('AboutUs');
                }}></CustomButton>
                <View>
                    <Copyright></Copyright>
                </View>
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
