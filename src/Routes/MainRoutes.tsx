import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import UploadPhoto from "../pages/Upload";
import Profile from "../pages/Profile";
import HomeRoute from "./HomeRoute";

const Tab = createBottomTabNavigator();

export default function MainRoutes(){
  return (
    //HomeRoute uses stack navigator
      <Tab.Navigator initialRouteName="Home Screen">
          <Tab.Screen name="Home Page" component={HomeRoute} options={{headerShown: false}}/>
          <Tab.Screen name="Upload Photo" component={UploadPhoto} options={{headerTitle:"Upload Photo"}}/>
          <Tab.Screen name="Profile" component={Profile} options={{headerTitle: "Profile"}}/>
      </Tab.Navigator>
  );
};