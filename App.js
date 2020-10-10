import { createAppContainer , createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';

const AppStack = createStackNavigator({ 
  Home:HomeScreen,
  Chat:ChatScreen,
  Profile:ProfileScreen
});
const AuthStack = createStackNavigator({ 
  Login:LoginScreen
});
export default createAppContainer (createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App:AppStack,
    Auth:AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
  ));