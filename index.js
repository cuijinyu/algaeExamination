import React from 'react';
import About from './App/AboutMe';
import HomePage from './App/HomePage';
import Add from './App/Add';
import GiftedFormModal  from './App/GiftedFormModal';
import History from './App/History';
import AboutUs from './App/AboutUs';
import location from './App/location';
import Modify from './App/Modify';
import {
  AppRegistry,
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

new location().getLocation().then(res => {
    console.warn(res);
  AsyncStorage.setItem('longitude', `${res.longitude}`, (err, response) => {
    if (err) {
      console.error(err);
    }
  })
  AsyncStorage.setItem('latitude', `${res.latitude}`, (err, response) => {
    if (err) {
      console.error(err);
    }
  })
  AsyncStorage.setItem('altitude', `${res.altitude}`, (err, response) => {
    if (err) {
      console.error(err);
    }
  })
})

const TabNav = TabNavigator({
  Home: {
    screen: HomePage,
  },
  About: {
    screen: About,
  }
}, {

  tabBarOptions: {
    activeTintColor: 'rgb(69, 193, 212)',
  },
  //// tabBar 显示的位置 ，android 默认是显示在页面顶端的
  tabBarPosition: 'bottom',
  animationEnabled: true, // 切换页面时是否有动画效果
  swipeEnabled: true, // 是否可以左右滑动切换tab 如果设置这个属性，这事例中下面设置的按钮 Go back home | Go to notifications就不好使了
  backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  //第一次加载时，显示的tab
  initialRouteName : 'Home',
  tabBarOptions: {
          activeTintColor: 'rgb(69, 193, 212)', // 文字和图片选中颜色
          inactiveTintColor: '#999', // 文字和图片未选中颜色
          showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
          showLabel: true, // android 是否展现文字 默认 true
          upperCaseLabel : false, //android 文字是否需要大写 默认true
          pressColor : 'blue', // android 按压时显示的颜色
          scrollEnabled : false,
          indicatorStyle: {
              height: 2  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          },
          style: {
              backgroundColor: 'rgb(240, 240, 240)', // TabBar 背景色
              // height: 50,
          },
          labelStyle: {
              fontSize: 15, // 文字大小
              paddingTop:0,
              marginTop:0,
          },
          tabStyle:{
              marginTop:10,
              height: 50,
          },
  },
});

export default algaeExamination = StackNavigator({
  TabNav: {
    screen: TabNav,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      // headerLeft: (<Button onPress={() => navigation.navigate('DrawerToggle')} title={'User'} />),
      // headerRight: (<Button onPress={() => navigation.navigate('Message')} title={'Message'} />),
    })
  },
  Add:{
    screen:Add
  },
  Modal: {
    screen: StackNavigator({
      defaultModal: { screen: GiftedFormModal }
    }, {
        navigationOptions: {
          header: null,
          gesturesEnabled: false
        },
        cardStyle: {
          shadowOffset: null,
          shadowOpacity: 0,
          shadowRadius: 10,
          backgroundColor: 'red'
        }
      })
  },
  History:{
    screen:History,
  },
  AboutUs:{
    screen:AboutUs,
  },
  Modify:{
    screen:Modify
  }
}, {
  initialRouteName:'TabNav'
})

AppRegistry.registerComponent('algaeExamination', () => algaeExamination);
