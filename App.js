import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//icon paketleri 
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


import HomeScreen from "./Screens/HomeScreen";
import EventScreen from "./Screens/EventScreen";
import ChatScreen from "./Screens/ChatScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import FavoriteScreen from "./Screens/FavoriteScreen";
import LoginScreen from "./Screens/LoginScreen";
import MapScreen from "./Screens/MapScreen";
import PostDetail from "./Screens/PostDetail";
import CreatePostScreen from "./Screens/CreatePostScreen";
import LoadingScreen from './Screens/LoadingScreen';
import Register from './Screens/Register';

import { Image, Text } from "react-native";
import { PostProvider } from './Context/PostContext';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { 
          backgroundColor: 'white',
          height: 80,
          paddingTop: 10,
          paddingBottom: 10,
          borderTopWidth: 0.7,
          justifyContent: 'center',
          paddingTop: 6
        },
        headerShown: false,
        tabBarLabel: () => null 
      })}>

      <Tab.Screen
       name="Home"
        component={HomeScreen}
         options={{ 
          tabBarIcon: ({color, size}) => (
            <Entypo name="home" size={28} color="black" />
          )
         }}/>

      <Tab.Screen
       name="Explore"
        component={EventScreen}
         options={{ 
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="compass" size={27} color="black" />
          )
         }}/>

      <Tab.Screen
       name="Create"
        component={CreatePostScreen}
         options={{ 
          tabBarIcon: ({color, size}) => (
            <AntDesign name="plus" size={28} color="black" />
          )
         }}/>

      <Tab.Screen
       name="Favorite"
        component={FavoriteScreen}
         options={{ 
          tabBarIcon: ({color, size}) => (
            <Feather name="heart" size={27} color="black" />
          )
         }}/>

      <Tab.Screen
       name="Profile"
        component={ProfileScreen}
         options={{ 
          tabBarIcon: () => (
            <Image
              source={require('./Components/Gorseller/borakaanaras.jpeg')}
              style={{
                width: 24,
                height: 24,
                borderRadius: 25
              }}
            />
          )
         }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simüle edilmiş yükleme süresi (2 saniye)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PostProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ headerShown: true }}
          />
          <Stack.Screen 
            name="PostDetail" 
            component={PostDetail} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PostProvider>
  );
}