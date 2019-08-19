import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoading from './src/Pages/Components/AuthLoading';
import LoginPage from './src/Pages/LoginPage';

import RegisterOnePage from './src/Pages/RegisterOnePage';
import RegisterTwoPage from './src/Pages/RegisterTwoPage';
import StatisticsPage from './src/Pages/StatisticsPage';
import ThankYouRegistration from './src/Pages/ThankYouRegistration';

const AuthStack = createStackNavigator({
  Login: LoginPage
}, {
  initialRouteName: 'Login'
});

const AppStack = createStackNavigator({
  RegisterOne: RegisterOnePage,
  RegisterTwo: RegisterTwoPage,
  Statistics: StatisticsPage,
  ThankYou: ThankYouRegistration
}, {
    initialRouteName: 'RegisterOne'
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    App: AppStack
  }, {
    initialRouteName: 'AuthLoading'
  }
));
