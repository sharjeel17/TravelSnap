import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/Screens/Home';
import PhotoDetails from './src/Screens/PhotoDetails';

//create stack navigation variable to use
const StackNav = createNativeStackNavigator();

export default function App() {

  return (
    //Everything inside the navigator as a Screen component can be navigated to
    <NavigationContainer>
      <StackNav.Navigator initialRouteName="Home">
        <StackNav.Screen name="Home" component={Home} />
        <StackNav.Screen name="Details" component={PhotoDetails} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}
