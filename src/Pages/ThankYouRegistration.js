import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Page from "./Components/Page";
import LogoPill from "./Components/LogoPill";
import styles from "./StyleSheets/RegistrationPageStyles";

export default class StatisticsPage extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Page>
        <View style={[styles.container, { justifyContent: "space-between" }]}>
          <View style={styles.loginFormContainer}>
            <LogoPill />
            <Text style={styles.loginTitle}>Thank You</Text>
            <Text style={styles.loginSubtitle}>
              The participant is registered.
            </Text>
            <View style={styles.loginContainer}>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('AuthLoading')}
                style={{
                  elevation: 5 ,
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
                    fontFamily: "LatoBlack",
                    fontSize: 40,
                    textAlign: "left",
                    color: "#000000"
                  }}
                >
                    Register Another
                </Text>
              </TouchableOpacity>
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
