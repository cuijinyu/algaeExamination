import React, {Component} from 'react';
import {TabNavigator} from 'react-navigation';
let AutoResponsive = require('autoresponsive-react-native');
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
    Dimensions
  } from 'react-native';

  let styles = StyleSheet.create({
    container: {
        backgroundColor: '#dddddd',
        paddingRight: 9,
        paddingLeft:9
    },
    // },
    // title: {
    //     paddingTop: 20,
    //     paddingBottom: 20,
    // },
    // titleText: {
    //     color: '#d0bbab',
    //     textAlign: 'center',
    //     fontSize: 36,
    //     fontWeight: 'bold',
    // },
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10
    },
});


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
      constructor(props) {
        super(props);
        this.SCREEN_WIDTH = Dimensions.get('window').width;
        this.state = {
            array: ['NEW', 'HISTORY', 'COMMIT', 'EXPORT', 'TRAJECTORY'],
            iconPath: [require('../asserts/NEW.png'),
                require('../asserts/HISTORY.png'),
                require('../asserts/COMMIT.png'),
                require('../asserts/EXPORT.png'),
                require('../asserts/TRAJECTORY.png')
            ],
            color: ['rgb(112,102,100)', 'rgb(191,102,96)','rgb(213,178,150)', 'rgb(207,175,74)', 'rgb(210,179,135)']
        }
    }


    getChildrenStyle(key) {
        let screenWidth = this.SCREEN_WIDTH;
        let color = this.state.color;
        return {
            width: (screenWidth - 18) / 2,
            height: (screenWidth - 18) / 2,
            backgroundColor: color[key],
            paddingTop: 20,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent : 'center',
            alignItems: 'center',
            paddingLeft: 9,
            paddingRight: 9,
        };
    }

    getImageStyle(){
        let Width = this.SCREEN_WIDTH;
        return{
            width: Width-18,
            height: (Width-18)*(2/3),
            borderRadius:10,
            marginTop:10,
            marginBottom:10
        }
    }

    getIconStyle(){
        let Width = (this.SCREEN_WIDTH-18)/2;
        return {
            width:50,
            height: 50,
            paddingLeft: 0.1*Width,
            paddingRight: 0.1*Width,
            paddingTop: 25,
            paddingBottom: 25,

        }
    }

    getAutoResponsiveProps() {
        return {
            itemMargin: 8,
        };
    }

    renderChildren() {
        let iconPaths = this.state.iconPath;
        let status = false;
        return this.state.array.map((i, key) => {
            // let str = '../asserts/'+key+'.png';
            // let iconPath = require(str);
            status = !status;
            if(status) {
                return (
                    <TouchableOpacity style={this.getChildrenStyle(key)} key={key} onPress={() => {
                        this.props.navigation.navigate('Add');
                    }}>
                        <Text style={styles.text}>{i}</Text>
                        <Image source={iconPaths[key]} style={this.getIconStyle()}/>
                    </TouchableOpacity>
                );
            }else{
                return (
                    <TouchableOpacity style={this.getChildrenStyle(key)} key={key} onPress={() => {
                        this.props.navigation.navigate('History');
                    }}>
                        <Image source={iconPaths[key]} style={this.getIconStyle()}/>
                        <Text style={styles.text}>{i}</Text>
                    </TouchableOpacity>
                    );
                }
                }, this);
                }

                // onPressTitle = () => {
                //     this.setState({
                //         array: [...this.state.array, parseInt(Math.random() * 30)],
                //     });
                // }

                render() {
                return (
                <ScrollView style={styles.container}>
                <Text style={{
                    position:'absolute',
                    top:40,
                    left:20,
                    fontSize:50,
                    // fontWeight:800,
                    color:'white',
                    zIndex:20
                }}>Science</Text>
                <Text style={{
                    position:'absolute',
                    top:100,
                    left:60,
                    fontSize:30,
                    color:'white',
                    zIndex:20
                }}>algae examination</Text>
                <Image source={require('../asserts/algea.jpg')} style={this.getImageStyle()}/>
                <AutoResponsive {...this.getAutoResponsiveProps()} onPress={() => {console.error()}}>
                    {this.renderChildren()}
                </AutoResponsive>
            </ScrollView>
        );
    }
  }
