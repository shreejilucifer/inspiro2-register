import React, { PureComponent } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Page from './Components/Page'
import LogoPill from './Components/LogoPill'
import styles from './StyleSheets/LoginPageStyles'
import nameicon from '../../assets/icons/nameicon.png'
import mailicon from '../../assets/icons/mailicon.png'
import passwordicon from '../../assets/icons/passwordicon.png'

export default class LoginPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    name: "",
    email: "",
    password: ""
  }

  onChangeText = (ch, value) => {
    switch( ch ) {
      case 'name': this.setState({ name: value }); break;
      case 'email': this.setState({ email: value }); break;
      case 'password': this.setState({ password: value }); break;
      default: console.log("Invalid onChangeText");
    }
  }

  onClickNext = ({name, email, password}, navigation) => {
    console.log( name );
    console.log( email );
    console.log( password );
    navigation.navigate('LoginOTP');
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <View style={styles.loginFormContainer}>
            <LogoPill />
            <Text style={styles.loginTitle}>Log In</Text>
            <Text style={styles.loginSubtitle}>Enter your details, click on next.</Text>
            <View style={styles.loginContainer}>
              <View style={styles.inputGroup}>
                <Image source={nameicon} style={styles.inputIcon} />
                <TextInput
                  placeholder="Name"
                  value={this.state.name}
                  onChangeText={text => this.onChangeText( "name", text )}
                  style={styles.inputContainer}
                />
              </View>
              <View style={styles.inputGroup}>
                <Image source={mailicon} style={styles.inputIcon} />
                <TextInput
                  placeholder="email@mail.com"
                  value={this.state.email}
                  onChangeText={text => this.onChangeText("email", text)}
                  style={styles.inputContainer}
                />
              </View>
              <View style={styles.inputGroup}>
                <Image source={passwordicon} style={styles.inputIcon} />
                <TextInput
                  placeholder="•••••••"
                  value={this.state.password}
                  onChangeText={text => this.onChangeText("password", text)}
                  style={styles.inputContainer}
                  secureTextEntry
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={()=>this.onClickNext(this.state, this.props.navigation)}
            style={styles.nextbtnContainer}
          >
            <Text style={styles.nextbtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </Page>
    )
  }
}
