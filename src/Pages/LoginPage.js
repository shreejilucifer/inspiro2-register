import React, { PureComponent } from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Page from './Components/Page'
import LogoPill from './Components/LogoPill'
import styles from './StyleSheets/LoginPageStyles'
import mailicon from '../../assets/icons/mailicon.png'
import passwordicon from '../../assets/icons/passwordicon.png'
import Keys from '../Config'
import axios from 'axios'

export default class LoginPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    phone: "",
    password: "",
    loading: false,
    error: ""
  }

  onChangeText = (ch, value) => {
    switch( ch ) {
      case 'phone': this.setState({ phone: value }); break;
      case 'password': this.setState({ password: value }); break;
      default: console.log("Invalid onChangeText");
    }
  }

  onClickNext = ({ phone, password}, navigation) => {

    var ph = /^[6-9]\d{9}$/;

    if( phone === "" || password === "" ) {
      this.setState({ error: "Phone Or Password Cannot Be Blank"});
    } else if( ph.test(phone) === false ) {
      this.setState({ error: "Phone Invalid" });
    } else {
      this.setState({ loading: true });

      var settings = {
        url: Keys.APIURL + "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          mobile: phone,
          password: password
        }
      };

      axios(settings)
        .then(async res => {
          if (res.data.status !== 200) {
            this.setState({ error: res.data.auth, loading: false });
          } else {
            await AsyncStorage.setItem(
              "userToken",
              res.headers["x-auth-token"]
            );
            this.setState({ loading: false, error: "" });
            navigation.navigate("App");
          }
        })
        .catch(err => {
          this.setState({
            loading: false,
            error: "Try Again!"
          });
      });
    }

  }

  async componentDidMount() {
   await AsyncStorage.removeItem("userToken");
  }


  render() {
    return (
      <Page>
        <View style={styles.container}>
          <View style={styles.loginFormContainer}>
            <LogoPill />
            <Text style={styles.loginTitle}>Log In</Text>
            <Text style={styles.loginSubtitle}>
              Enter your details, click on next.
            </Text>
            <View style={styles.loginContainer}>
              <View style={styles.inputGroup}>
                <Image source={mailicon} style={styles.inputIcon} />
                <TextInput
                  keyboardType="phone-pad"
                  placeholder="9898989898"
                  value={this.state.phone}
                  onChangeText={text => this.onChangeText("phone", text)}
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
            onPress={() =>
              this.onClickNext(this.state, this.props.navigation)
            }
            disabled={this.state.loading}
            style={styles.nextbtnContainer}
          >
            {this.state.loading ? (
              <ActivityIndicator size="small" color="#272727" />
            ) : (
              <Text style={styles.nextbtnText}>Next</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        </View>
      </Page>
    );
  }
}
