import React, {Component, createReactClass} from 'react';
import Copyright from './Copyright.js';
import {TabNavigator} from 'react-navigation';
import location from './location.js';
import realm from '../db/realm.js';
import  ImagePicker  from 'react-native-image-picker';
import Panel from 'react-native-panel';
let options = {
    title: 'Select Photos About This Document',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    ToastAndroid,
    Button
} from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import ModalDropdown from 'react-native-modal-dropdown';
import moment from 'moment';
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
        // borderBottomWidth:1,
        // borderBottomColor:'blue',
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
    }
})


export default class FormComponent extends Component{
    constructor(props) {
        super(props)
        this.state={
            photos : [],
            avatarSource: null,
            evaluation:'',
            substrate:'',
            collections:'',
            ecosystems:'',
        }
        this.uuid.bind(this);
    }
    uuid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        return uuid;
    }

    componentWillMount() {
        let local;
        (async () => {
            local = await new location().getLocation();
            this.setState({
                local
            })
        })()
    }

    render() {
        let ecosystems = ['Ponds', 'Bogs', 'Fens', 'Swamps', 'Lakes', 'wet wall',
            'Springs', 'Caves', 'Headwaters to the mouths of rivers', 'Waterfalls'];
        let collections = ['Plankton Tow', 'Epiphytes', 'Scrape', 'Baster', 'Composite'];
        let substrate = ['Rock', 'Wood', 'Moss', 'Benthos'];
        let evaluation = ['Excellent', 'Very good', 'Good', 'Undetermined/Requires Additional Review'];
        return (
            <GiftedForm
                formName='algaeForm' // GiftedForm instances that use the same name will also share the same states
                openModal={
                    (router) => {
                        this.props.navigation.navigate('Modal',
                            {
                                renderContent: router.renderScene,
                                onClose: router.onClose,
                                getTitle: router.getTitle
                            });
                    }
                }
                clearOnClose={true}
            >



              {/*//basic*/}
                <Panel header="basic">

                <GiftedForm.TextInputWidget
                    name='name' // mandatory
                    title='name'
                    placeholder='a new document'
                    clearButtonMode='while-editing'
                />

                <GiftedForm.TextInputWidget
                    name='place' // mandatory
                    title='place'
                    placeholder='Yun nan'
                    clearButtonMode='while-editing'
                />

                <GiftedForm.TextInputWidget
                    name='latitude'
                    title='latitude'
                    clearButtonMode='while-editing'
                    onTextInputFocus = {
                        (currentText = '') => {
                            if(!currentText) {
                                currentText = `${this.state.local.latitude}`;
                            }
                            return currentText;
                        }
                    }
                />

                <GiftedForm.TextInputWidget
                    name='longitude' // mandatory
                    title='longitude'
                    clearButtonMode='while-editing'
                    onTextInputFocus = {
                        (currentText = '') => {
                            if(!currentText) {
                                currentText = `${this.state.local.longitude}`;
                            }
                            return currentText;
                        }
                    }
                />

                <GiftedForm.TextInputWidget
                    name='elevation' // mandatory
                    title='elevation'
                    clearButtonMode='while-editing'
                    onTextInputFocus = {
                        (currentText = '') => {
                            if(!currentText) {
                                currentText = `${this.state.local.altitude}`;
                            }
                            return currentText;
                        }
                    }
                />
                </Panel>
                <Panel header="select">
                <View style={Styles.selectView}>
                    <Text style={{width:'30%', textAlign:'center', color:'black'}}>Ecosystems</Text>
                    <ModalDropdown options={ecosystems} 
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
                                   textStyle={Styles.textStyle} 
                                   dropdownTextStyle={Styles.dropdownTextStyle} 
                                   style={Styles.buttonStyle}
                                   onSelect ={(idx, value) => this.setState({
                                    substrate:value
                                  })}/>
                </View>
                </Panel>
                <Panel header="gauge">

                <GiftedForm.TextInputWidget
                    name='temperature' // mandatory
                    title='temperature'
                    clearButtonMode='while-editing'
                />
                <GiftedForm.TextInputWidget
                    name='ph' // mandatory
                    title='ph'
                    clearButtonMode='while-editing'
                />
                <GiftedForm.TextInputWidget
                    name='conductivity' // mandatory
                    title='conductivity'
                    clearButtonMode='while-editing'
                />
                <GiftedForm.TextInputWidget
                    name='salinity' // mandatory
                    title='salinity'
                    clearButtonMode='while-editing'
                />
                <GiftedForm.TextInputWidget
                    name='nitrogen' // mandatory
                    title='nitrogen'
                    clearButtonMode='while-editing'
                />
                <GiftedForm.TextInputWidget
                    name='phosphorus' // mandatory
                    title='phosphorus'
                    clearButtonMode='while-editing'
                />
                </Panel>

                <Panel header="evaluation">
                    <View style={Styles.selectView}>
                        <Text style={{width:'30%', textAlign:'center', color:'black'}}>evaluation</Text>
                        <ModalDropdown options={evaluation} 
                                       textStyle={Styles.textStyle} 
                                       dropdownTextStyle={Styles.dropdownTextStyle} 
                                       style={Styles.buttonStyle}
                                       onSelect ={(idx, value) => this.setState({
                                        evaluation:value
                                      })}/>
                    </View>
                </Panel>
                <GiftedForm.GroupWidget title="take a photo">
                </GiftedForm.GroupWidget>

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

                <GiftedForm.ErrorsWidget/>

                <GiftedForm.SubmitWidget
                    title='CREATE'
                    widgetStyles={{
                        submitButton: {
                            backgroundColor: 'blue',
                        }
                    }}
                    onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
                        let { name, place, latitude,elevation, longitude, temperatrue, ph, conductivity, salinity, nitrogen, phosphorus } = values;
                        if ( name === '' ||
                             place === ''||
                             latitude === ''||
                             longitude === ''||
                             temperatrue === ''||
                             elevation === ''||
                             ph === ''||
                             conductivity === ''||
                             salinity === ''||
                             nitrogen === ''||
                             phosphorus === ''||
                             this.state.ecosystems === ''||
                             this.state.collections === ''||
                             this.state.substrate === ''||
                             this.state.elavation === ''){
                               console.errror('error');
                             }
                            let newDocument = {
                            time:`${this.state.local.time}`,
                            id:this.uuid(),
                            state:'false',
                            name:`${name}`,
                            place:`${place}`,
                            latitude:`${latitude}`,
                            longitude:`${longitude}`,
                            elevation:`${elevation}`,
                            temperature:`${temperatrue}`,
                            ph:`${ph}`,
                            conductivity:`${conductivity}`,
                            salinity:`${salinity}`,
                            nitrogen:`${nitrogen}`,
                            phosphorus:`${phosphorus}`,
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
                            })()
                        }
                        new realm().addData(newDocument);
                        postSubmit();
                        this.props.navigation.navigate('TabNav');
                    }}
                />
                <GiftedForm.NoticeWidget
                    title='You must enten all the input before you create.'
                />
                <GiftedForm.HiddenWidget name='tos' value={true} />
                <View style={{marginTop:20, marginBottom:20}}>
                    <Copyright></Copyright>
                </View>
            </GiftedForm>

        );
    }
};