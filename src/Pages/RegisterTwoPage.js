import React, { PureComponent } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
import Page from './Components/Page'
import LogoPill from './Components/LogoPill'
import styles from './StyleSheets/RegistrationPageStyles'
import collegeicon from '../../assets/icons/collegeicon.png'
import semestericon from '../../assets/icons/semicon.png'
import membershipicon from '../../assets/icons/membershipicon.png'
import BackBtn from './Components/BackBtn';
import RadioForm from 'react-native-simple-radio-button';
import Keys from "../Config";
import axios from "axios";

export default class LoginPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    college: "",
    semester: "",
    membership: "",
    membershipid: "",
    error: "",
    loading: false
  }

  componentDidMount() {
    this.setState({ membership: "Non IEEE" });
  }

  onChangeText = (ch, value) => {
    switch (ch) {
      case 'college': this.setState({ college: value }); break;
      case 'semester': this.setState({ semester: value }); break;
      case 'membershipid': this.setState({ membershipid: value }); break;
      case 'membership':
                        (value === 0) ?
                          this.setState({ membership: "IEEE" })
                            :
                          this.setState({ membership: "Non IEEE" })
                        break;
      default: console.log("Invalid onChangeText");
    }
  }

  onClickNext = async ({ college, semester, membership, membershipid }, {firstname, lastname, email, mobile}, navigation) => {
    if( college === "" ) {
      this.setState({ error: "College Cannot Be Empty !" });
    } else if( semester === "" ) {
      this.setState({ error: "Semester Cannot Be Emoty !" });
    } else if( membership === "" ) {
      this.setState({ error: "Membership Cannot Be Empty !" });
    } else if( membership === "IEEE" && membershipid === "" ) {
      this.setState({ error: "Membership ID Cannot Be Empty !" });
    } else {

      this.setState({ loading: true });
      const userToken = await AsyncStorage.getItem("userToken");
      var settings ;

      if( membership === "Non IEEE" ) {

        settings = {
          url: Keys.APIURL + "/registration",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken
          },
          data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            mobile: mobile,
            college: college,
            semester: semester
          }
        };

        axios( settings )
        .then( (res) => {
          if( res.data.status === 200 ) {
            this.setState({
              college: "",
              semester: "",
              membership: "",
              error: "",
              loading: false,
              membershipid: ""
            });

            navigation.navigate("ThankYou");
          } else {
            this.setState({error: "Error in Registration Check Data !"})
          }
        })
        .catch( (err) => {
          this.setState({
            error: "Try Again !"
          });
        });
      } else {
        settings = {
          url: Keys.APIURL + "/registration",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": userToken
          },
          data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            mobile: mobile,
            college: college,
            semester: semester,
            membership: membershipid
          }
        };

        axios(settings)
          .then(res => {
            if (res.data.status === 200) {
              this.setState({
                college: "",
                semester: "",
                membership: "",
                error: "",
                loading: false,
                membershipid: ""
              });

              navigation.navigate("ThankYou");
            } else {
              this.setState({
                error: "Error in Registration Check Data !"
              });
            }
          })
          .catch(err => {
            this.setState({
              error: "Try Again !"
            });
          });
      }

    }

  }

  render() {
    const { navigation } = this.props;
    const firstname = navigation.getParam("firstname", "TestFirstName");
    const lastname = navigation.getParam("lastname", "TestLastName");
    const email = navigation.getParam("email", "test@email.com");
    const mobile = navigation.getParam("mobile", "9191919191");

    return (
      <Page>
        <View
          style={[styles.container, { justifyContent: "space-between" }]}
        >
          <View style={styles.loginFormContainer}>
            <LogoPill />
            <BackBtn
              onBackClick={() => {
                this.props.navigation.navigate("RegisterOne");
              }}
            />
            <Text style={styles.loginTitle}>Registration</Text>
            <Text style={styles.loginSubtitle}>
              Enter the educational details and press next.
            </Text>
            <View style={styles.loginContainer}>
              <View style={styles.inputGroup}>
                <Image source={collegeicon} style={styles.inputIcon} />
                <TextInput
                  placeholder="College Name"
                  value={this.state.college}
                  onChangeText={text => this.onChangeText("college", text)}
                  style={styles.inputContainer}
                />
              </View>
              <View style={styles.inputGroup}>
                <Image source={semestericon} style={styles.inputIcon} />
                <TextInput
                  keyboardType="numeric"
                  placeholder="Semester"
                  value={this.state.semester}
                  onChangeText={text => this.onChangeText("semester", text)}
                  style={styles.inputContainer}
                />
              </View>
              <View style={[styles.inputGroup, { borderBottomWidth: 0 }]}>
                <Image source={membershipicon} style={styles.inputIcon} />
                <Text style={{ marginLeft: 15 }}>Membership Type</Text>
              </View>
              <RadioForm
                radio_props={[
                  { label: "IEEE", value: 0 },
                  { label: "Non IEEE", value: 1 }
                ]}
                onPress={value => this.onChangeText("membership", value)}
                initial={1}
                buttonSize={10}
                buttonColor="#707070"
                buttonInnerColor="#fff"
                buttonOuterColor="#fff"
                selectedButtonColor="#3addff"
                labelStyle={styles.radioText}
                formHorizontal={true}
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "80%"
                }}
              />
              {
                (this.state.membership === "IEEE")?
                <View style={styles.inputGroup}>
                  <Image source={semestericon} style={styles.inputIcon} />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="88888888"
                    value={this.state.membershipid}
                    onChangeText={text => this.onChangeText("membershipid", text)}
                    style={styles.inputContainer}
                  />
              </View>
              :
              null
              }
            </View>
            <TouchableOpacity
              onPress={() =>
                this.onClickNext(
                  this.state,
                  { firstname, lastname, email, mobile },
                  this.props.navigation
                )
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
          </View>
          <Text style={styles.errorMessage}>{this.state.error}</Text>
          <BottomContainer
            active="register"
            navigation={this.props.navigation}
          />
        </View>
      </Page>
    );
  }
}
