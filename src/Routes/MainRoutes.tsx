import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import UploadPhoto from "../pages/Upload";
import Profile from "../pages/Profile";
import HomeRoute from "./HomeRoute";

const Tab = createBottomTabNavigator();

export default function MainRoutes(){
  return (
    //only one navigation container can be present within navigators 
    //HomeRoute uses stack navigator
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Home Screen">
            <Tab.Screen name="Home Screen" component={HomeRoute} options={{headerShown: false}}/>
            <Tab.Screen name="Upload Photo Screen" component={UploadPhoto}/>
            <Tab.Screen name="Profile Screen" component={Profile}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
};