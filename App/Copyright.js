import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';


class Copyright extends React.Component {
  render() {
    return (
      <View style={{marginTop:30}}>
        <Text style={{textAlign:'center'}}>@2018 Designed by SXU AE group</Text>
        <Text style={{textAlign:'center'}}>Powered by React-Native.</Text>
      </View>
    );
  }
}

export default Copyright;