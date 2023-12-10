import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/Screens/Home';
import PhotoDetails from './src/Screens/PhotoDetails';

const StackNav = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName="Home">
        <StackNav.Screen name="Home" component={Home} />
        <StackNav.Screen name="Details" component={PhotoDetails} />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
