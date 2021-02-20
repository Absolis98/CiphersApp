import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "./src/screens/HomeScreen";
import EncipherScreen from './src/screens/EncipherScreen';
import DecipherScreen from './src/screens/DecipherScreen';
import DemoScreen from './src/screens/DemoScreen';
import CipherInfoScreen from './src/screens/CipherInfoScreen';
import DecipherInfoScreen from './src/screens/DecipherInfoScreen';
import CiphersScreen from './src/screens/CiphersScreen';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const CipherTab = createBottomTabNavigator();


const CipherTabScreen = () => (
  <CipherTab.Navigator>
        <CipherTab.Screen name="HomeStackScreen" component={HomeStackScreen} options={{ title: "Home" }}/>
        <CipherTab.Screen name="CipherScreen" component={EncipherScreen} options={{ title: "Encipher" }}/>
        <CipherTab.Screen name="DecipherScreen" component={DecipherScreen} options={{ title: "Decipher" }}/>
        <CipherTab.Screen name="DemoScreen" component={DemoScreen} options={{ title: "Demo" }}/>
  </CipherTab.Navigator>
)

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Home" }}/>
    <HomeStack.Screen name="CipherInfoScreen" component={CipherInfoScreen} options={{ title: "Enciphering: More Info" }}/>
    <HomeStack.Screen name="DecipherInfoScreen" component={DecipherInfoScreen} options={{ title: "Deciphering: More Info" }}/>
  </HomeStack.Navigator>
)



function App () {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen  name="CiphersScreen" component={CiphersScreen} options={{ title: "Ciphers" }}/>
        <Stack.Screen  name="CipherTabScreen" component={CipherTabScreen} options={{ title: "K-Rail Fence Cipher" }}/>
      </Stack.Navigator>
      
    </NavigationContainer>  
  )
};

export default App;
