import React, { PureComponent } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Page from './Components/Page'
import BottomContainer from './Components/BottomContainer'
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
    mobile: "",
    error: ""
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
    var ph = /^[6-9]\d{9}$/;
    var name = /^[a-zA-Z ]*$/;
    var emailValid = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/ ;

    if( firstname === "" ) {
      this.setState({ error: "First Name Cannot Be Empty !" });
    } else if( lastname === "" ) {
      this.setState({ error: "Last Name Cannot Be Empty !" });
    } else if( email === "" ) {
      this.setState({ error: "Email Cannot Be Empty !" });
    } else if( mobile === "" ) {
      this.setState({ error: "Mobile Cannot Be Empty !" });
    } else if( name.test(firstname) === false ) {
      this.setState({ error: "First Name Invalid !" });
    } else if( name.test(lastname) === false ) {
      this.setState({ error: "Last Name Invalid !" });
    } else if( emailValid.test(email) === false ) {
      this.setState({ error: "Email Invalid !" });
    } else if( ph.test(mobile) === false ) {
      this.setState({ error: "Mobile Invalid !" });
    } else {
      navigation.navigate("RegisterTwo", {
        firstname,
        lastname,
        email,
        mobile
      });
    }
  }

  render() {
    return (
      <Page>
        <View
          style={[styles.container, { justifyContent: "space-between" }]}
        >
          <View style={styles.loginFormContainer}>
            <LogoPill />
            <Text style={styles.loginTitle}>Registration</Text>
            <Text style={styles.loginSubtitle}>
              Enter details and register a baby here 👶🏼🐣
            </Text>
            <View style={styles.loginContainer}>
              <View style={styles.inputGroup}>
                <Image source={nameicon} style={styles.inputIcon} />
                <TextInput
                  placeholder="First Name"
                  value={this.state.firstname}
                  onChangeText={text =>
                    this.onChangeText("firstname", text)
                  }
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
                  keyboardType="phone-pad"
                  placeholder="Mobile No."
                  value={this.state.mobile}
                  onChangeText={text => this.onChangeText("mobile", text)}
                  style={styles.inputContainer}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.onClickNext(this.state, this.props.navigation)
              }
              style={styles.nextbtnContainer}
            >
              <Text style={styles.nextbtnText}>Next</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.errorMessage}>{this.state.error}</Text>
          <BottomContainer
            active='register'
            navigation={this.props.navigation}
          />
        </View>
      </Page>
    );
  }
}
