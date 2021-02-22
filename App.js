import React from "react";
import { TouchableOpacity, Alert, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import EncipherScreen from "./src/screens/EncipherScreen";
import DecipherScreen from "./src/screens/DecipherScreen";
import DemoScreen from "./src/screens/DemoScreen";
import CiphersScreen from "./src/screens/CiphersScreen";

const Stack = createStackNavigator();
const CipherTab = createBottomTabNavigator();

const CipherTabScreen = () => (
  <CipherTab.Navigator
    screenOptions={({ route }) => ({
      cardStyle: { backgroundColor: "#ffe3de" },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "HomeScreen") {
          iconName = focused ? "home-sharp" : "home-outline";
        } else if (route.name === "EncipherScreen") {
          iconName = focused ? "lock-closed-sharp" : "lock-closed-outline";
        } else if (route.name === "DecipherScreen") {
          iconName = focused ? "lock-open-sharp" : "lock-open-outline";
        } else if (route.name === "DemoScreen") {
          iconName = focused ? "play-circle-sharp" : "play-circle-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      style: {
        backgroundColor: "#03506f", //color you want to change
      },
      activeTintColor: "white",
      inactiveTintColor: "white",
    }}
  >
    <CipherTab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ title: "Home" }}
    />
    <CipherTab.Screen
      name="EncipherScreen"
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
      <StatusBar barStyle="default" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#03506f" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          cardStyle: { backgroundColor: "#ffe3de" },
        }}
      >
        <Stack.Screen
          name="CiphersScreen"
          component={CiphersScreen}
          options={{
            title: "Ciphers",
            headerRight: () => (
              <TouchableOpacity
                style={{
                  fontSize: "100%",
                  alignSelf: "center",
                  marginRight: 15,
                }}
                onPress={() =>
                  Alert.alert(
                    "Help",
                    "Select a cipher. Use the tab navigation buttons to switch between screens."
                  )
                }
              >
                <Ionicons
                  size={33}
                  name={"help-circle-outline"}
                  color={"white"}
                />
              </TouchableOpacity>
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
