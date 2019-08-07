import React, { PureComponent } from 'react'
import * as Font from 'expo-font';
import { Text } from 'react-native'

export default class Page extends PureComponent {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Lato': require('../../../assets/fonts/Lato-Regular.ttf'),
      'LatoBlack': require('../../../assets/fonts/Lato-Black.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if( this.state.fontLoaded ) {
      return this.props.children;
    } else {
      return <Text>Loading</Text>
    }
  }
}
