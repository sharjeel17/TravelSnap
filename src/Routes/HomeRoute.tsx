import Home from '../pages/Home';
import PhotoDetails from '../pages/PhotoDetails';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//create stack navigation variable to use
const StackNav = createNativeStackNavigator();

export default function HomeRoute() {
    return (
    //Everything inside the navigator as a Screen component can be navigated to
      <StackNav.Navigator initialRouteName="Home">
        <StackNav.Screen name="TravelSnap" component={Home} />
        <StackNav.Screen name="Details" component={PhotoDetails} />
      </StackNav.Navigator>
    )
}