import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CiphersScreen = ({ navigation }) => {
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
      <TouchableOpacity onPress={() => navigation.push("CipherTabScreen2")}>
        <LinearGradient
          style={styles.button}
          colors={["#43C6AC", "#191654"]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text style={styles.buttonText}>PRESENT Block Cipher</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("RSACipherTabScreen")}>
        <LinearGradient
          style={styles.button}
          colors={["#43C6AC", "#191654"]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text style={styles.buttonText}>RSA Cipher</Text>
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
