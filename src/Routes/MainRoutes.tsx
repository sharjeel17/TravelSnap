import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import UploadPhoto from "../pages/Upload";
import Profile from "../pages/Profile";
import HomeRoute from "./HomeRoute";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MainRoutes(){
  return (
    //HomeRoute uses stack navigator
      <Tab.Navigator initialRouteName="Home Screen">
          <Tab.Screen name="Home Page" component={HomeRoute} 
          options={{
            headerShown: false, 
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                style={{
                  opacity: focused ? 0.95 : 0.5,
                  marginBottom: focused ? 6 : 0,
                  fontSize: 26
                }}
                name="home-outline"
              />
            ),
          }}
          />
          <Tab.Screen name="Upload Photo" component={UploadPhoto} options={{headerTitle:"Upload Photo", 
          tabBarIcon: ({ focused }) => (
              <Ionicons 
                style={{
                  opacity: focused ? 0.95 : 0.5,
                  marginBottom: focused ? 6 : 0,
                  fontSize: 26
                }}
                name="camera-outline"
              />
            )}} 
            />
          <Tab.Screen name="Profile" component={Profile} options={{headerTitle: "Profile", tabBarIcon: ({ focused }) => (
              <Ionicons 
                style={{
                  opacity: focused ? 0.95 : 0.5,
                  marginBottom: focused ? 6 : 0,
                  fontSize: 26
                }}
                name="person-outline"
              />
            )}}/>
      </Tab.Navigator>
  );
};