import React, { PureComponent } from 'react'
import { Text, View, AsyncStorage } from 'react-native'

export default class AuthLoading extends PureComponent {

  constructor(){
      super();
      this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      this.props.navigation.navigate( userToken ? 'App' : 'Auth' );
  }

  render(){
      return <View><Text>Loading</Text></View>
  }
}
