import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CipherButton from "../components/CipherButton";
import { LinearGradient } from "expo-linear-gradient";

const CiphersScreen = ({ navigation }) => {
  const screenList = [{ key: "1" }, {}];

  return (
    <View>
      <Text style={styles.Text}>
        CiphersScreen: (More ciphers to come soon)
      </Text>
      {/* <CipherButton title="K-Rail Fence Cipher"/> */}
      <TouchableOpacity onPress={() => navigation.push("CipherTabScreen")}>
        <LinearGradient
          style={styles.button}
          colors={["#43C6AC", "#191654"]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text style={styles.buttonText}>K-Rail Fence Cipher</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Text: {
    marginLeft: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 30,
    marginRight: 30,
    marginVertical: 10,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default CiphersScreen;
