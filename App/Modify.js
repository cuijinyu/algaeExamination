import React, {Component, createReactClass} from 'react';
import Copyright from './Copyright.js';
import {TabNavigator} from 'react-navigation';
import location from './location.js';
import realm from '../db/realm.js';
import  ImagePicker  from 'react-native-image-picker';
import Panel from 'react-native-panel';
import t from 'tcomb-form-native';
import moment from 'moment';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    Button
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

let options = {
    title: 'Select Photos About This Document',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let Form = t.form.Form;

const Styles = StyleSheet.create({
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    },
    dropdownTextStyle:{
        fontSize: 14,
        minWidth:150
    },
    textStyle: {
        height:50,
        lineHeight:50,
        fontSize: 15,
        marginLeft:10,
        textAlign:'center',
    },
    selectView: {
        display:'flex',
        flexDirection:'row',
        height: 50,
        lineHeight:50,
        borderBottomColor: '#acb2b9',
        borderBottomWidth: 1,
        alignItems:'center'
    },
    buttonStyle : {
        width:'70%',
        borderLeftColor:'#acb2b9',
        borderLeftWidth:1
    },
    container: {
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
})


export default class Modify extends Component{
    constructor(props) {
        super(props)
        const {navigation} = this.props;
        const id = navigation.getParam('id', null);
        // console.error(id);
        if(id){
            let fil = {id: id};
            let datas = new realm().searchData(fil)[0];
            let image = [];
            image = datas.images.split(';');
            image = image.map(item => {
                return {
                    uri:item
                }
            })
            for (let i = 0; i < image.length; i++) {
                if (image[i].uri === '') {
                    image.splice(i, 1);
                }
            }
            if(datas){
                this.state={
                    state: datas.state,
                    id: id,
                    isFound: true,
                    photos : image,
                    evaluation:datas.evaluation,
                    substrate:datas.substrate,
                    collections:datas.collections,
                    ecosystems:datas.ecosystems,
                    time:datas.time,
                    lat:datas.latitude,
                    lng:datas.longitude,
                    ev:datas.evaluation,
                    basic:{
                        name:datas.name,
                        place:datas.place,
                        latitude:datas.latitude,
                        longtitude:datas.longitude,
                        elevation:datas.elevation,
                    },
                    gauge:{
                        temperature:datas.temperature,
                        ph:datas.ph,
                        conductivity:datas.conductivity,
                        salinity:datas.salinity,
                        nitrogen:datas.nitrogen,
                        phosphorus:datas.phosphorus,
                    }
                }
            }
        }else{
            this.state.isFound = false;
        }
        // this.uuid.bind(this);
    }

    componentDidMount() {
        new location().getLocation().then(res => {
            this.setState({
                lng:res.longitude,
                lat:res.latitude,
                ev:res.altitude,
            })
        })
    }

    submit(){
        let datas = {
            time:`${this.state.time}`,
            id:this.state.id,
            state:this.state.state,
            ecosystems:this.state.ecosystems,
            collections:this.state.collections,
            substrate:this.state.substrate,
            evaluation:this.state.evaluation,
            images: (() => {
                let resString = "";
                for (let i = 0;i < this.state.photos.length;i++) {
                    resString += this.state.photos[i].uri + ';';
                }
                return resString;
            })(),
            longitude:`${this.state.basic.longtitude}`,
            latitude:`${this.state.basic.latitude}`,
            place:`${this.state.basic.place}`,
            elevation:`${this.state.basic.elevation}`,
            name:`${this.state.basic.name}`,
            ph:`${this.state.gauge.ph}`,
            temperature:`${this.state.gauge.temperature}`,
            conductivity:`${this.state.gauge.conductivity}`,
            salinity:`${this.state.gauge.salinity}`,
            nitrogen:`${this.state.gauge.nitrogen}`,
            phosphorus:`${this.state.gauge.phosphorus}`
        };
        new realm().updateData(datas);
        this.props.navigation.navigate('History');
    }



    render() {
        let basic = t.struct({
            name:t.String,
            place:t.String,
            latitude:t.String,
            longtitude:t.String,
            elevation:t.String,
        });

        let gaugeOptions = {
            fields:{
                ph:{
                    help: 'Your help message here',
                }
            }
        }

        let gauge = t.struct({
            temperature:t.String,
            ph:t.String,
            conductivity:t.String,
            salinity:t.String,
            nitrogen:t.String,
            phosphorus:t.String,
        });

        let ecosystems = ['Ponds', 'Bogs', 'Fens', 'Swamps', 'Lakes', 'wet wall',
            'Springs', 'Caves', 'Headwaters to the mouths of rivers', 'Waterfalls'];
        let collections = ['Plankton Tow', 'Epiphytes', 'Scrape', 'Baster', 'Composite'];
        let substrate = ['Rock', 'Wood', 'Moss', 'Benthos'];
        let evaluation = ['Excellent', 'Very good', 'Good', 'Undetermined/Requires Additional Review'];
        if(!this.state.isFound){
            return (
                    <View>
                        <Text style={{textAlign:'center', marginTop:'30%'}}>Error</Text>
                    </View>
            )
        }
        else{
            return (
                <ScrollView>
                    {/*//basic*/}
                    <Panel header="basic">
                        <View style={Styles.container}>
                        <Form
                            ref="basic"
                            type={basic}
                            value={this.state.basic}
                            onChange={(value) => {
                                this.setState({
                                    basic:value
                                })
                            }}
                        />
                        </View>
                    </Panel>
                    {/*select*/}
                    <Panel header="select">
                    <View style={Styles.selectView}>
                        <Text style={{width:'30%', textAlign:'center', color:'black'}}>Ecosystems</Text>
                        <ModalDropdown options={ecosystems} 
                                    defaultValue={this.state.ecosystems}
                                    textStyle={Styles.textStyle} 
                                    dropdownTextStyle={Styles.dropdownTextStyle} 
                                    style={Styles.buttonStyle}
                                    onSelect={(idx, value) => this.setState({
                                        ecosystems:value
                                    })}/>
                    </View>
                    <View style={Styles.selectView}>
                        <Text style={{width:'30%', textAlign:'center', color:'black'}}>Collection</Text>
                        <ModalDropdown options={collections} 
                                    defaultValue={this.state.collections}
                                    textStyle={Styles.textStyle} 
                                    dropdownTextStyle={Styles.dropdownTextStyle} 
                                    style={Styles.buttonStyle}
                                    onSelect ={(idx, value) => this.setState({
                                        collections:value
                                    })}/>
                    </View>
                    <View style={Styles.selectView}>
                        <Text style={{width:'30%', textAlign:'center', color:'black'}}>Substrate</Text>
                        <ModalDropdown options={substrate}
                                    defaultValue={this.state.substrate} 
                                    textStyle={Styles.textStyle} 
                                    dropdownTextStyle={Styles.dropdownTextStyle} 
                                    style={Styles.buttonStyle}
                                    onSelect ={(idx, value) => this.setState({
                                        substrate:value
                                    })}/>
                    </View>
                    </Panel>

                    {/*gauge*/}
                    <Panel header="gauge">
                        <View style={Styles.container}>
                        <Form
                            ref="gauge" 
                            type={gauge}
                            value={this.state.gauge}
                            onChange={value => {
                                this.setState({
                                    gauge:value
                                })
                            }}
                        />
                        </View>

                    </Panel>



                    <Panel header="evaluation">
                        <View style={Styles.selectView}>
                            <Text style={{width:'30%', textAlign:'center', color:'black'}}>evaluation</Text>
                            <ModalDropdown options={evaluation} 
                                        defaultValue={this.state.evaluation}
                                        textStyle={Styles.textStyle} 
                                        dropdownTextStyle={Styles.dropdownTextStyle} 
                                        style={Styles.buttonStyle}
                                        onSelect ={(idx, value) => this.setState({
                                            evaluation:value
                                        })}/>
                        </View>
                    </Panel>

                    <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
                        {
                            this.state.photos.map((item) => {
                                return (
                                    <TouchableOpacity  onLongPress={() => {
                                        let photos = this.state.photos;
                                        for (let i = 0; i < photos.length; i++) {
                                            if (photos[i].uri == item.uri) {
                                                photos.splice(i, 1);
                                                this.setState({
                                                    photos
                                                })
                                                return;
                                            }
                                        }
                                    }}>
                                        <Image source={item} style={{width:100,height:100,marginRight:5,marginBottom:5}}/>
                                    </TouchableOpacity>
                                )})
                        }
                        <TouchableOpacity onPress={() => {
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
                                    let photos = this.state.photos;
                                    let flag = true;
                                    for (let i = 0;i < photos.length;i ++) {
                                        if (photos[i].uri === source.uri) {
                                            flag = !flag;
                                            break;
                                        }
                                    }
                                    if (flag) {
                                        photos.push(source);
                                        this.setState({
                                            photos
                                        });
                                    }
                                }
                            });
                        }}>
                            <Image
                                style={{width:100, height:100}}
                                source={require('../asserts/add.png')}
                            />
                        </TouchableOpacity>
                    </View>


                    <TouchableHighlight onPress={()=>{this.submit();}} underlayColor='#99d9f4' style={Styles.button}>
                        <Text style={Styles.buttonText}>Modify</Text>
                    </TouchableHighlight>

                    <View style={{marginTop:20, marginBottom:20}}>
                        <Copyright></Copyright>
                    </View>
                </ScrollView>

            );
        }
    }
};