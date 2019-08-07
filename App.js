import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginPage from './src/Pages/LoginPage';
import LoginOTPPage from './src/Pages/LoginOTPPage';

import RegisterOnePage from './src/Pages/RegisterOnePage';
import RegisterTwoPage from './src/Pages/RegisterTwoPage';

const AuthStack = createStackNavigator({
  Login: LoginPage,
  LoginOTP: LoginOTPPage
}, {
  initialRouteName: 'Login'
});

const AppStack = createStackNavigator({
  RegisterOne: RegisterOnePage,
  RegisterTwo: RegisterTwoPage
}, {
    initialRouteName: 'RegisterOne'
});

export default createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack
  }, {
    initialRouteName: 'Auth'
  }
));
