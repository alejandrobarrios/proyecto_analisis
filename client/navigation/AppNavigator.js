import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import PlayScreen from '../screens/PlayScreen';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SignInScreen from '../screens/SignInScreen';
import AnswerScreen from '../screens/AnswerScreen';
import ScoresScreen from '../screens/ScoresScreen';
import QuestionScreen from '../screens/QuestionScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';

const PlayStack = createStackNavigator({ Home: HomeScreen, Play: PlayScreen, Question: QuestionScreen, Answer: AnswerScreen, Score: ScoresScreen});
const AuthStack = createStackNavigator({ SignIn: SignInScreen});
const RulesStack = createStackNavigator({ Rules: InstructionsScreen,});
const StatsStack = createStackNavigator({ Stats: StatsScreen});
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