import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import PlayScreen from '../screens/PlayScreen';
import HomeScreen from '../screens/HomeScreen';
import OtherScreen from '../screens/OtherScreen';
import SignInScreen from '../screens/SignInScreen';
import QuestionScreen from '../screens/QuestionScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const QuestionStack = createStackNavigator({ Question: QuestionScreen });
const PlayStack = createStackNavigator({ Play: PlayScreen });
const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Play: PlayStack,
    Question: QuestionStack, 
  },
  {
    initialRouteName: 'AuthLoading',
  }
));