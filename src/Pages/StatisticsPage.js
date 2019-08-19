import React, { PureComponent } from 'react'
import { Text, View, ActivityIndicator, AsyncStorage } from 'react-native'
import Page from "./Components/Page"
import LogoPill from "./Components/LogoPill"
import styles from "./StyleSheets/RegistrationPageStyles"
import Keys from "../Config";
import axios from 'axios'

export default class StatisticsPage extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    loading: false,
    registrations: "",
    payment: "300"
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const userToken = await AsyncStorage.getItem('userToken');

    var settings = {
      url: Keys.APIURL + "/paymentsAnalysis",
      method: "GET",
      headers: {
        "x-auth-token": userToken,
      }
    };

    axios( settings )
    .then( (res) => {
      this.setState({
        registrations: res.data.auth.registrations_today,
        payment: res.data.auth.payments_today,
        loading: false
      });
    })
    .catch( (err) => {

    })
  }


  render() {
    return (
      <Page>
        <View
          style={[styles.container, { justifyContent: "space-between" }]}
        >
          <View style={styles.loginFormContainer}>
            <LogoPill />
            <Text style={styles.loginTitle}>Statistics</Text>
            <Text style={styles.loginSubtitle}>
              All the statistics related to you.
            </Text>
            <View style={styles.loginContainer}>
              <View
                style={{
                  backgroundColor: "#ffdfdf",
                  width: "100%",
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 10,
                  flexDirection: "column"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lato",
                    fontSize: 20,
                    textAlign: "left",
                    color: "#000000"
                  }}
                >
                  Total amount collected today
                </Text>
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#272727" />
                ) : (
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: "LatoBlack",
                      fontSize: 40,
                      textAlign: "left",
                      color: "#000000"
                    }}
                  >
                    {this.state.payment}
                  </Text>
                )}
              </View>
              <View
                style={{
                  backgroundColor: "#e6e2ff",
                  marginTop: 20,
                  width: "100%",
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 10,
                  flexDirection: "column"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lato",
                    fontSize: 20,
                    textAlign: "left",
                    color: "#000000"
                  }}
                >
                  Number of registrations
                </Text>
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#272727" />
                ) : (
                  <Text
                    style={{
                      marginTop: 10,
                      fontFamily: "LatoBlack",
                      fontSize: 40,
                      textAlign: "left",
                      color: "#000000"
                    }}
                  >
                    {this.state.registrations}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <BottomContainer
            active="statistics"
            navigation={this.props.navigation}
          />
        </View>
      </Page>
    );
  }
}
