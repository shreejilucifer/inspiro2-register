import React, { PureComponent } from 'react'
import { Text, View, Image, TextInput,Picker, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native'
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
    collegeList: [],
    membership: "",
    membershipid: "",
    paymentType: "",
    registrationType: "",
    error: "",
    loading: false,
    loadingCollege: false
  }

  async componentDidMount() {
    this.setState({
      membership: "Non IEEE",
      paymentType: "Cash",
      registrationType: "Student",
      loadingCollege: true
    });

    const userToken = await AsyncStorage.getItem('userToken');

    var settings = {
      url: Keys.APIURL + "/college",
      method: "GET",
      headers: {
        "x-auth-token": userToken,
      }
    };

    axios( settings )
    .then( (res) => {
      console.log( res.data.auth );
      this.setState({
        collegeList: res.data.auth,
        college: res.data.auth[0].collegeName,
        loadingCollege: false
      });
    })
    .catch( (err) => {

    })
  }

  onChangeText = (ch, value) => {
    switch (ch) {
      case "college":
        this.setState({ college: value });
        break;
      case "membershipid":
        this.setState({ membershipid: value });
        break;
      case "membership":
        value === 0
          ? this.setState({ membership: "IEEE" })
          : this.setState({ membership: "Non IEEE" });
        break;
      case "paymenttype":
        value === 0
          ? this.setState({ paymentType: "PayTM" })
          : this.setState({ paymentType: "Cash" });
        break;
      case "registrationtype":
        value === 0
          ? this.setState({ registrationType: "Student" })
          : this.setState({ registrationType: "Young Professional" });
        break;
      default:
        console.log("Invalid onChangeText");
    }
  }

  onClickNext = async ({
    college, paymentType, registrationType, membership, membershipid
  }, {firstname, lastname, email, mobile}, navigation) => {

    if( college === "" ) {
      this.setState({ error: "College Cannot Be Empty !" });
    } else if( paymentType === "" ) {
      this.setState({ error: "Payment Cannot Be Emoty !" });
    } else if( registrationType === "" ) {
      this.setState({ error: "Registration Type Cannot Be Emoty !" });
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
            paymentType: paymentType,
            registrationType: registrationType
          }
        };

        console.log(settings.data);

        axios( settings )
        .then( (res) => {
          if (res.data.auth === "Registraion Successful") {
            this.setState({
              college: "",
              collegeList: [],
              membership: "",
              membershipid: "",
              paymentType: "",
              registrationType: "",
              error: "",
              loading: false,
              loadingCollege: true
            });
            navigation.navigate("ThankYou");
          } else {
            this.setState({
              error: "Error in Registration Check Data !"
            });
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
            membership: membershipid,
            paymentType: paymentType,
            registrationType: registrationType
          }
        };

        console.log( settings.data );

        axios(settings)
          .then(res => {
            console.log( res.data );
            if (res.data.auth === "Registraion Successful") {
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
                {this.state.loadingCollege ? (
                  <View
                    style={{
                      width: "100%",
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <ActivityIndicator size="small" color="#272727" />
                  </View>
                ) : (
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.college}
                    style={{ width: "90%", marginLeft: 15 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onChangeText("college", itemValue)
                    }
                  >
                    {this.state.collegeList.map((college, key) => (
                      <Picker.Item
                        label={college.collegeName}
                        value={college.collegeName}
                        key={key}
                      />
                    ))}
                  </Picker>
                )}
              </View>
              <View style={[styles.inputGroup, { borderBottomWidth: 0 }]}>
                <Image source={membershipicon} style={styles.inputIcon} />
                <Text style={{ marginLeft: 15 }}>Payment Type</Text>
              </View>
              <RadioForm
                radio_props={[
                  { label: "PayTM", value: 0 },
                  { label: "Cash", value: 1 }
                ]}
                onPress={value => this.onChangeText("paymenttype", value)}
                initial={1}
                buttonSize={10}
                buttonColor="#707070"
                buttonInnerColor="#fff"
                buttonOuterColor="#fff"
                selectedButtonColor="#3addff"
                labelStyle={styles.radioText}
                formHorizontal={true}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "80%"
                }}
              />
              <View style={[styles.inputGroup, { borderBottomWidth: 0 }]}>
                <Image source={membershipicon} style={styles.inputIcon} />
                <Text style={{ marginLeft: 15 }}>Registration Type</Text>
              </View>
              <RadioForm
                radio_props={[
                  { label: "Student", value: 0 },
                  { label: "Young Professional", value: 1 }
                ]}
                onPress={value =>
                  this.onChangeText("registrationtype", value)
                }
                initial={0}
                buttonSize={10}
                buttonColor="#707070"
                buttonInnerColor="#fff"
                buttonOuterColor="#fff"
                selectedButtonColor="#3addff"
                labelStyle={styles.radioText}
                formHorizontal={true}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%"
                }}
              />
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "80%"
                }}
              />
              {this.state.membership === "IEEE" ? (
                <View style={styles.inputGroup}>
                  <Image source={semestericon} style={styles.inputIcon} />
                  <TextInput
                    keyboardType="numeric"
                    placeholder="88888888"
                    value={this.state.membershipid}
                    onChangeText={text =>
                      this.onChangeText("membershipid", text)
                    }
                    style={styles.inputContainer}
                  />
                </View>
              ) : null}
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
                <Text style={styles.nextbtnText}>Register</Text>
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
