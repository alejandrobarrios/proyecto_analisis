import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import PlayScreen from '../screens/PlayScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import AnswerScreen from '../screens/AnswerScreen';
import QuestionScreen from '../screens/QuestionScreen';
import StastsScreen from '../screens/StatsScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

const PlayStack = createStackNavigator({ Home: HomeScreen, Play: PlayScreen, Question: QuestionScreen, Answer: AnswerScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen});
const RulesStack = createStackNavigator({ Rules: InstructionsScreen});
const StackStack = createStackNavigator({ Stacks: StatsScreen});
const CreateAccountStack = createStackNavigator({ CreateAccount: CreateAccountScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    Rules: RulesStack,
    Play: PlayStack,
    Stats: StatsStack,
    CreateAccount: CreateAccountStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));