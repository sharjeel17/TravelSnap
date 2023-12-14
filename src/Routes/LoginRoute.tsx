import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import MainRoutes from "./MainRoutes";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig/Firebase";
import Register from "../pages/Register";

//create stack navigation variable to use
const StackNav = createNativeStackNavigator();

export default function LoginRoute() {
    const [user, setUser] = useState<User | null>(null);

    //add auth change observer/event listener on initial render of page
    //which will trigger setting the user to the logged in user if user logs in
    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            console.log('user', user);
            setUser(user);
        })
    },[])

    return (
        //Only one navigation container can be present within navigators 
        //Everything inside the navigator as a Screen component can be navigated to
        //If a user is logged in, user state variable will be not null and user will be re-directed to main routes
        <NavigationContainer>
            <StackNav.Navigator initialRouteName="Login">
                {user ? <StackNav.Screen name="Main" component={MainRoutes} options={{headerShown: false}}/> : 
                (
                <>
                    <StackNav.Screen name="Login" component={Login} />
                    <StackNav.Screen name="Register" component={Register} />
                </>
                )}
            </StackNav.Navigator>
        </NavigationContainer>
    )
}