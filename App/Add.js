import React, {Component, createReactClass} from 'react';
import Copyright from './Copyright.js';
import {TabNavigator} from 'react-navigation';
import location from './location.js';
import realm from '../db/realm.js';
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
import moment from 'moment';
const Styles = StyleSheet.create({
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
})
export default class FormComponent extends Component{
  constructor(props) {
    super(props)
    this.state={
      photos : [],
      avatarSource: null
    }
  }

  componentWillMount() {
    let local;
    let realmInstance = new realm();
    (async () => {
      local = await new location().getLocation();
      this.setState({
        local
      })
    })()
  }

  render() {
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
        clearOnClose={true} // delete the values of the form when unmounted
        // defaults={{
        //   time:this.state.local.time,
        //   longitude:this.state.local.longitude,
        //   laititude:this.state.local.laititude
        // }}
        // validators={{
        //   fullName: {
        //     title: 'Full name',
        //     validate: [{
        //       validator: 'isLength',
        //       arguments: [1, 23],
        //       message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
        //     }]
        //   },
        //   username: {
        //     title: 'Username',
        //     validate: [{
        //       validator: 'isLength',
        //       arguments: [3, 16],
        //       message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
        //     },{
        //       validator: 'matches',
        //       arguments: /^[a-zA-Z0-9]*$/,
        //       message: '{TITLE} can contains only alphanumeric characters'
        //     }]
        //   },
        //   password: {
        //     title: 'Password',
        //     validate: [{
        //       validator: 'isLength',
        //       arguments: [6, 16],
        //       message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
        //     }]
        //   },
        //   emailAddress: {
        //     title: 'Email address',
        //     validate: [{
        //       validator: 'isLength',
        //       arguments: [6, 255],
        //     },{
        //       validator: 'isEmail',
        //     }]
        //   },
        //   bio: {
        //     title: 'Biography',
        //     validate: [{
        //       validator: 'isLength',
        //       arguments: [0, 512],
        //       message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
        //     }]
        //   },
        //   gender: {
        //     title: 'Gender',
        //     validate: [{
        //       validator: (...args) => {
        //         if (args[0] === undefined) {
        //           return false;
        //         }
        //         return true;
        //       },
        //       message: '{TITLE} is required',
        //     }]
        //   },
        //   birthday: {
        //     title: 'Birthday',
        //     validate: [{
        //       validator: 'isBefore',
        //       arguments: [moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
        //       message: 'You must be at least 18 years old'
        //     }, {
        //       validator: 'isAfter',
        //       arguments: [moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
        //       message: '{TITLE} is not valid'
        //     }]
        //   },
        //   country: {
        //     title: 'Country',
        //     validate: [{
        //       validator: 'isLength',
        //       arguments: [2],
        //       message: '{TITLE} is required'
        //     }]
        //   },
        // }}
      >
        <GiftedForm.GroupWidget title="basic">
        </GiftedForm.GroupWidget>
        <GiftedForm.SeparatorWidget />

        {/* <GiftedForm.TextInputWidget
          name='time' // mandatory
          title='time'
          placeholder='Yun nan'
          clearButtonMode='while-editing'
        /> */}
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

        <GiftedForm.SeparatorWidget />

        <GiftedForm.GroupWidget title="select">
        </GiftedForm.GroupWidget>
       
        <GiftedForm.ModalWidget
          title='ecosystems'
          displayValue='ecosystems'
        >
          <GiftedForm.SeparatorWidget />

          <GiftedForm.SelectWidget name='ecosystems' title='ecosystems' multiple={false}>
            <GiftedForm.OptionWidget  title='Ponds' value='Ponds'/>
            <GiftedForm.OptionWidget  title='Bogs' value='Bogs'/>
            <GiftedForm.OptionWidget  title='Fens' value='Fens'/>
            <GiftedForm.OptionWidget  title='Swamps' value='Swamps'/>
            <GiftedForm.OptionWidget  title='Lakes' value='Lakes'/>
            <GiftedForm.OptionWidget  title='“wet walls”' value='“wet walls”'/>
            <GiftedForm.OptionWidget  title='Springs' value='Springs'/>
            <GiftedForm.OptionWidget  title='Caves' value='Caves'/>
            <GiftedForm.OptionWidget  title='Headwaters to the mouths of rivers' value='Headwaters to the mouths of rivers'/>
            <GiftedForm.OptionWidget  title='Waterfalls' value='Waterfalls'/>
          </GiftedForm.SelectWidget>
        </GiftedForm.ModalWidget>

        <GiftedForm.ModalWidget
          title='collections'
          displayValue='collections'
          scrollEnabled={false}
        >
          <GiftedForm.SeparatorWidget/>
          <GiftedForm.SelectWidget name='collections' title='collections' multiple={false}>
            <GiftedForm.OptionWidget  title='Plankton Tow' value='Plankton Tow'/>
            <GiftedForm.OptionWidget  title='Epiphytes' value='Epiphytes'/>
            <GiftedForm.OptionWidget  title='Scrape' value='Scrape'/>
            <GiftedForm.OptionWidget  title='Baster' value='Baster'/>
            <GiftedForm.OptionWidget  title='Composite' value='Composite'/>
          </GiftedForm.SelectWidget>
        </GiftedForm.ModalWidget>

        <GiftedForm.ModalWidget
          title='substrate'
          displayValue='substrate'
          scrollEnabled={false}
        >
          <GiftedForm.SelectWidget name='substrate' title='substrate' multiple={false}>
              <GiftedForm.OptionWidget  title='Rock' value='Rock'/>
              <GiftedForm.OptionWidget  title='Wood' value='Wood'/>
              <GiftedForm.OptionWidget  title='Moss' value='Moss'/>
              <GiftedForm.OptionWidget  title='Benthos' value='Benthos'/>
          </GiftedForm.SelectWidget>
        </GiftedForm.ModalWidget>

        <GiftedForm.GroupWidget title="gauge">
        </GiftedForm.GroupWidget>

        <GiftedForm.SeparatorWidget />

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

        <GiftedForm.GroupWidget title="evaluation">
        </GiftedForm.GroupWidget>

        <GiftedForm.SeparatorWidget />

         <GiftedForm.ModalWidget
          title='evaluation'
          displayValue='evaluation'
          scrollEnabled={false}
        >
          <GiftedForm.SelectWidget name='substrate' title='substrate' multiple={false}>
              <GiftedForm.OptionWidget  title='Excellent' value='Excellent'/>
              <GiftedForm.OptionWidget  title='Very good' value='Very good'/>
              <GiftedForm.OptionWidget  title='Good' value='Good'/>
              <GiftedForm.OptionWidget  title='Undetermined/Requires Additional Review' value='Undetermined/Requires Additional Review'/>
          </GiftedForm.SelectWidget>
        </GiftedForm.ModalWidget>
      

        <GiftedForm.GroupWidget title="take a photo">
        </GiftedForm.GroupWidget>

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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                  avatarSource: source
                });
              }
            });
         }}>
            <Image
              style={{}}
              source={require('../asserts/add.png')}
            />
        </TouchableOpacity>

        <View>
        {
              this.state.avatarSource===null?<Text>please choose some photo</Text>:<Image style={Styles.avatar} source={this.state.avatarSource} />
              // this.state.photos.map(function(item) {
              // return (
              //   <Image source={item}/>
              // )})
            }
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
            postSubmit();
            realmInstance.addData({

            });
            GiftedFormManager.reset('algaeForm');
             /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(); // disable the loader
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
          }}
        />

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />
        <View style={{marginTop:20, marginBottom:20}}>
          <Copyright></Copyright>
        </View>
      </GiftedForm>
    );
  }
};
