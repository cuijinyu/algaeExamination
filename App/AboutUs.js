import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import Copyright from './Copyright';

class AboutUs extends Component {



    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.head}>
                    <Image source={require('../asserts/algea.jpg')} style={styles.icon}/>
                    <Text style={styles.name}>A E</Text>
                    <Text style={styles.version}>V 1.0.0</Text>
                </View>
                <View style={styles.introduce}>
                    <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>Members:</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>崔晋瑜</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>董凤坤</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>薛志国</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>王彤</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>{'\n'}</Text>
                    <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>Adviser:</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>陈士剑</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>{'\n'}</Text>
                    <Text style={{textAlign:'center', fontWeight:'bold', fontSize:20}}>Producer:</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>Shanxi University</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>School of Computer and Information Technology</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>&</Text>
                    <Text style={{textAlign:'center', fontSize:15}}>School of Life Science</Text>


                    <Copyright/>
                </View>
            </View>
           </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        flex: 1,
    },
    head: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 210,
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    version: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    introduce: {
        height: 450,
        justifyContent: 'center',
    }

});

export default AboutUs;