
import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';
import Realm from '../db/realm';
import _ from 'underscore';

import  {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    navigator,
    Image,
    TouchableOpacity,
} from 'react-native';

let styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },

    textName: {
        // textAlign: 'center',
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black',
        paddingLeft: 10,
        paddingRight: 50
    },

    viewTime: {
        paddingRight: 5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    textTime: {
        fontSize: 13,
        color: 'rgb(55,55,55)',
    },

    icon: {
        width: 50,
        height: 50,
        marginTop:2.5,
        marginBottom:2.5,
        marginLeft: 2.5,
        borderRadius: 50/2
    },

    slider:{
        flexDirection: 'column'
    }
});


export default class History extends Component {

    constructor() {
        super();
        this.Width = Dimensions.get('window').width;
        let datas = new Realm().getAll();
        let newData = [];
        for (let i = 0;i < datas.length;i++) {
            newData.push(Object.assign({}, datas[i]));
        }
        this.getFirstImageArray.bind(this);
        this.state = {
            datas:newData
        }
    }

    getFirstImageArray (imageString) {
        let imageArray = imageString.split(";");
        if (imageArray.length === 0) {
            return [];
        } else {
                return [imageArray.shift()];
        }
    }

    getContinerStyle(){
        return{
                height: 55,
                backgroundColor: 'white',
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                flexDirection: 'row',
        }
    }

    getTextView(){
        let Width = this.Width;
        return {
            width: Width - 57.5,
        }
    }

    getIcon(param){
        let datas = this.state.datas;
        console.warn(this.getFirstImageArray(datas[param].images)[0]);
        return(
            {
                uri:this.getFirstImageArray(datas[param].images)[0]
            }
        )
    }

    jumpToView(viewuuid){
        this.props.navigation.navigate('Modify',{
            id:viewuuid,
        });
    }

    Commit(commituuid){
        
    }

    Delete(deleteuuid){
        let param = {id: deleteuuid};
        new Realm().deleteData(param.id);
        let searchData = new Realm().getAll();
        let newData = [];
        for (let i = 0; i < searchData.length; i++){
            newData.push(Object.assign({}, searchData[i]));
        }
        this.setState({
            datas:newData
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {   this.state.datas.length === 0?<View>
                        <Text style={{textAlign:'center', marginTop:'30%'}}>暂无数据</Text>
                    </View>:this.state.datas.map((i, key) => {
                        let swipeoutBtns = [
                        {
                            text: 'Commit',
                            color: 'white',
                            backgroundColor: 'rgb(202,202,207)',
                            onPress: () => {this.Commit(i.id)},
                        },
                        {
                            text: 'Delete',
                            color: 'white',
                            backgroundColor: 'rgb(249,61,32)',
                            onPress: () => {this.Delete(i.id)},
                        }
                    ]
                    // console.error(source);
                    return (
                            <Swipeout right={swipeoutBtns} autoClose={true}>
                                <TouchableOpacity key={key} onPress={()=>{this.jumpToView(i.id)}}>
                                    <View style={this.getContinerStyle()}>
                                        <Image style={styles.icon} source={this.getIcon(key)}/>
                                        <View style={this.getTextView()}>
                                            <Text style={styles.textName} numberOfLines={1}>{i.name}</Text>
                                            <View style={styles.viewTime}>
                                                <Text style={styles.textTime}numberOfLines={1}>{moment(i.time,'YYYY MMMM Do, h:mm:ss a').fromNow()}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Swipeout>
                        );
                    })
                }
            </ScrollView>
        );
    }
}