import React, { PureComponent } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Page from './Components/Page'
import LogoPill from './Components/LogoPill'
import BackBtn from './Components/BackBtn'
import styles from './StyleSheets/LoginPageStyles'
import mailicon from '../../assets/icons/mailicon.png'

export default class LoginOTPPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    otp: ""
  }

  onChangeOTP = (value) => {
    this.setState({ otp: value });
  }

  onClickLogIn = ({otp}, navigation) => {
    console.log( otp );
    navigation.navigate('App');
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <View style={styles.loginFormContainer}>
            <LogoPill />
            <BackBtn onBackClick={()=>{this.props.navigation.navigate('Login')}}/>
            <Text style={styles.loginTitle}>Log In</Text>
            <Text style={styles.loginSubtitle}>Enter the OTP sent to your Phone/Email</Text>
            <View style={styles.loginContainer}>
              <View style={styles.inputGroup}>
                <Image source={mailicon} style={styles.inputIcon} />
                <TextInput
                  placeholder="OTP"
                  value={this.state.otp}
                  onChangeText={text => this.onChangeOTP(text)}
                  style={styles.inputContainer}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.onClickLogIn(this.state, this.props.navigation)}
            style={styles.nextbtnContainer}
          >
            <Text style={styles.nextbtnText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </Page>
    )
  }
}
