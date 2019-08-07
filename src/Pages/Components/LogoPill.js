import React from 'react';
import { View, Image } from 'react-native';
import styles from '../StyleSheets/LoginPageStyles';
import logo from '../../../assets/icons/logo.png';

const LogoPill = () => (
  <View style={styles.logoPillContainer}>
    <Image source={logo} style={styles.logo} />
  </View>
);

export default LogoPill;
