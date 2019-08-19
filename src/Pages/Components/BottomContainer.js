import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from '../StyleSheets/RegistrationPageStyles';

export default (BottomContainer = props => (
  <View style={styles.bottomContainer}>
    <TouchableOpacity
      style={
        props.active === "register"
          ? styles.bottomPillsActive
          : styles.bottomPills
      }
      onPress={() => props.navigation.navigate("AuthLoading")}
    >
      <Text style={styles.bottomPillText}>Registration</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={
        props.active === "statistics"
          ? styles.bottomPillsActive
          : styles.bottomPills
      }
      onPress={() => props.navigation.navigate("Statistics")}
    >
      <Text style={styles.bottomPillText}>Statistics</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => props.navigation.navigate("Auth")}
      style={styles.bottomPills}
    >
      <Text style={styles.bottomPillText}>Log Out</Text>
    </TouchableOpacity>
  </View>
));
