import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import PlayScreen from '../screens/PlayScreen';
import HomeScreen from '../screens/HomeScreen';
import OtherScreen from '../screens/OtherScreen';
import SignInScreen from '../screens/SignInScreen';
import AnswerScreen from '../screens/AnswerScreen';
import QuestionScreen from '../screens/QuestionScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

const PlayStack = createStackNavigator({ Home: HomeScreen, Play: PlayScreen, Question: QuestionScreen, Answer: AnswerScreen });
const AppStack = createStackNavigator({ Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen});
const CreateAccountStack = createStackNavigator({ CreateAccount: CreateAccountScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Play: PlayStack,
    CreateAccount: CreateAccountStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));