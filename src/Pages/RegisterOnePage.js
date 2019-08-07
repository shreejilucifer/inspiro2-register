import React, { PureComponent } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Page from './Components/Page'
import LogoPill from './Components/LogoPill'
import styles from './StyleSheets/RegistrationPageStyles'
import nameicon from '../../assets/icons/nameicon.png'
import mailicon from '../../assets/icons/mailicon.png'
import passwordicon from '../../assets/icons/passwordicon.png'

export default class LoginPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: ""
  }

  onChangeText = (ch, value) => {
    switch (ch) {
      case 'firstname': this.setState({ firstname: value }); break;
      case 'lastname': this.setState({ lastname: value }); break;
      case 'email': this.setState({ email: value }); break;
      case 'mobile': this.setState({ mobile: value }); break;
      default: console.log("Invalid onChangeText");
    }
  }

  onClickNext = ({ firstname, lastname, email, mobile }, navigation) => {
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(mobile);
    navigation.navigate('RegisterTwo');
  }

  render() {
    return (
      <Page>
        <View style={[styles.container, { justifyContent: 'space-between' }]}>
            <View style={styles.loginFormContainer}>
              <LogoPill />
              <Text style={styles.loginTitle}>Registration</Text>
              <Text style={styles.loginSubtitle}>Enter details and register a baby here 👶🏼🐣</Text>
              <View style={styles.loginContainer}>
                <View style={styles.inputGroup}>
                  <Image source={nameicon} style={styles.inputIcon} />
                  <TextInput
                    placeholder="First Name"
                    value={this.state.firstname}
                    onChangeText={text => this.onChangeText("firstname", text)}
                    style={styles.inputContainer}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Image source={nameicon} style={styles.inputIcon} />
                  <TextInput
                    placeholder="Last Name"
                    value={this.state.lastname}
                    onChangeText={text => this.onChangeText("lastname", text)}
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
                    placeholder="Mobile No."
                    value={this.state.mobile}
                    onChangeText={text => this.onChangeText("mobile", text)}
                    style={styles.inputContainer}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.onClickNext(this.state, this.props.navigation)}
                style={styles.nextbtnContainer}
              >
                <Text style={styles.nextbtnText}>Next</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity style={styles.bottomPillsActive}>
                <Text style={styles.bottomPillText}>Registration</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomPills}>
                <Text style={styles.bottomPillText}>Statistics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottomPills}>
                <Text style={styles.bottomPillText}>Log Out</Text>
              </TouchableOpacity>
            </View>
        </View>
      </Page>
    )
  }
}
