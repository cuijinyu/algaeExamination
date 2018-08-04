import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { createStackNavigator } from 'react-navigation';

/**
 * 样式，目前是Demo，应该外提
 * 为页面元素写样式
 * 命名改为驼峰式命名，因为变量不支持-命名
 */
const styles = StyleSheet.create({
    bigView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
});

/**
 * 页面主组件
 */
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        /**
         * 这里是页面状态
         * 编写事件绑定然后修改这里即可
         */
        this.state = {isShowingText: true};
    }
    /**
     * 这里用来指定nativagation的一些属性，详细属性见文档
     */
    static navigationOptions = {
        title: 'Welcome',
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.bigView}>
                <Button onPress={() => {navigate('SecondScreen', {test: '1234'})}} title="测试"></Button>
            </View>
        );
    }
}


/**
 * 页面第二组件
 */
class SecondScreen extends React.Component {
    constructor(props) {
        super(props);

        /**
         * 这里是页面状态
         * 编写事件绑定然后修改这里即可
         */
        this.state = {
            test:123456,
        }
    }
    render() {
        return (
            <View style={styles.bigView}>
                <Text>{this.state.test}</Text>
                <Button title="测试" onPress={() => this.setState({
                    test:1234
                })}></Button>
            </View>
        );
    }
}


/**
 * 导航器
 * 可以在此处按照堆栈的方式，进行导航
 */
export default createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    SecondScreen: {
        screen: SecondScreen,
    }
});
