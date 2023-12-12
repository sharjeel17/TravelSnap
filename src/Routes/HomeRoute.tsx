import { KeyboardAvoidingView } from 'react-native';
import Home from '../pages/Home';
import PhotoDetails from '../pages/PhotoDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//create stack navigation variable to use
const StackNav = createNativeStackNavigator();

export default function HomeRoute() {
    return (
    //Everything inside the navigator as a Screen component can be navigated to
      <StackNav.Navigator initialRouteName="Home">
        <StackNav.Screen name="Home" component={Home} />
        <StackNav.Screen name="Details" component={PhotoDetails} />
      </StackNav.Navigator>
    )
}