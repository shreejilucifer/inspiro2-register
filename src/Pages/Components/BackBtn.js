import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import backicon from '../../../assets/icons/backicon.png';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingTop: 20,
    paddingRight: 20,
  },
  btnicon: {
    width: 20,
    height: 20,
  }
});

export default BackBtn = (props) => (
  <TouchableOpacity
    onPress={props.onBackClick}
    style={styles.container}
  >
    <Image source={backicon} style={styles.btnicon} />
  </TouchableOpacity>
);
