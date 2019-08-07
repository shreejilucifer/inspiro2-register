import React, { PureComponent } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Page from './Components/Page'
import LogoPill from './Components/LogoPill'
import styles from './StyleSheets/RegistrationPageStyles'
import collegeicon from '../../assets/icons/collegeicon.png'
import semestericon from '../../assets/icons/semicon.png'
import membershipicon from '../../assets/icons/membershipicon.png'
import BackBtn from './Components/BackBtn';
import RadioForm from 'react-native-simple-radio-button';

export default class LoginPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    college: "",
    semester: "",
    membership: "IEEE",
  }

  onChangeText = (ch, value) => {
    switch (ch) {
      case 'college': this.setState({ college: value }); break;
      case 'semester': this.setState({ semester: value }); break;
      case 'membership':
                        (value === 0) ?
                          this.setState({ membership: "IEEE" })
                            :
                          this.setState({ membership: "Non IEEE" })
                        break;
      default: console.log("Invalid onChangeText");
    }
  }

  onClickNext = ({ college, semester, membership }, navigation) => {
    console.log(college);
    console.log(semester);
    console.log(membership);
    // navigation.navigate('');
  }

  render() {
    return (
      <Page>
        <View style={[styles.container, { justifyContent: 'space-between' }]}>
            <View style={styles.loginFormContainer}>
              <LogoPill />
              <BackBtn onBackClick={() => { this.props.navigation.navigate('RegisterOne') }} />
              <Text style={styles.loginTitle}>Registration</Text>
              <Text style={styles.loginSubtitle}>Enter the educational details and press next.</Text>
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
                    placeholder="Semester"
                    value={this.state.semester}
                    onChangeText={text => this.onChangeText("semester", text)}
                    style={styles.inputContainer}
                  />
                </View>
                <View style={[styles.inputGroup, {borderBottomWidth: 0}]}>
                  <Image source={membershipicon} style={styles.inputIcon} />
                  <Text style={{ marginLeft: 15 }}>Membership Type</Text>
                </View>
                <RadioForm
                  radio_props={[
                    { label: 'IEEE', value: 0 },
                    { label: 'Non IEEE', value: 1 }
                  ]}
                  onPress={(value) => this.onChangeText("membership", value)}
                  initial={0}
                  buttonSize={10}
                  buttonColor="#707070"
                  buttonInnerColor="#fff"
                  buttonOuterColor="#fff"
                  selectedButtonColor="#3addff"
                  labelStyle={styles.radioText}
                  formHorizontal={true}
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '80%'
                  }}
                />
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
