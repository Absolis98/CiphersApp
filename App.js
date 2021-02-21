import React from "react";
import { Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import EncipherScreen from "./src/screens/EncipherScreen";
import DecipherScreen from "./src/screens/DecipherScreen";
import DemoScreen from "./src/screens/DemoScreen";
import CiphersScreen from "./src/screens/CiphersScreen";

const Stack = createStackNavigator();
const CipherTab = createBottomTabNavigator();

const CipherTabScreen = () => (
  <CipherTab.Navigator>
    <CipherTab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ title: "Home" }}
    />
    <CipherTab.Screen
      name="CipherScreen"
      component={EncipherScreen}
      options={{ title: "Encipher" }}
    />
    <CipherTab.Screen
      name="DecipherScreen"
      component={DecipherScreen}
      options={{ title: "Decipher" }}
    />
    <CipherTab.Screen
      name="DemoScreen"
      component={DemoScreen}
      options={{ title: "Demo" }}
    />
  </CipherTab.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CiphersScreen"
          component={CiphersScreen}
          options={{
            title: "Ciphers",
            headerRight: () => (
              <Button
                onPress={() =>
                  Alert.alert(
                    "Help",
                    "Select a cipher. Use the tab navigation buttons to switch between screens."
                  )
                }
                title="?"
              />
            ),
          }}
        />
        <Stack.Screen
          name="CipherTabScreen"
          component={CipherTabScreen}
          options={{ title: "K-Rail Fence Cipher" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
