import React, {Component} from 'react';
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

let bc = "red";
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
        width:80,
        height:80,
        backgroundColor:bc
    },
    innerContainer:{
        flexDirection: "column",
        justifyContent:"center",
        width:50
    },
    img:{
        width:50,
        height:50
    },
    text:{
        textAlign:'center',
        width:50
    }
});

export default class HomeButton extends React.Component {
    constructor (props) {
        super(props);
        bc = props.bc;
    }
    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.innerContainer}> 
                    <Image source={this.props.img} style={styles.img}/>
                    <Text style={styles.text}>{this.props.text}</Text>
                </TouchableOpacity>
            </View>
        )
    }
  }