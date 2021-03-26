import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cipher } from "../algorithms/PRESENT";

const EncipherScreen2 = ({ navigation }) => {
  const [thisKey, setKey] = useState("");
  const [thisKeySize, setKeySize] = useState(80);
  const [thisMessage, setMessage] = useState("");
  const [thisCiphertext, setCiphertext] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ flex: 5 }}>
        <Text style={styles.Text}>
          Please enter a key and a message to encipher.
        </Text>
        <Text style={styles.Text}>Key:</Text>
        <TextInput
          style={[styles.input, { paddingTop: 0 }]}
          keyboardType="number-pad"
          value={thisKey.toString()}
          numberOfLines={1}
          onChangeText={(newValue) => setKey(newValue)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={(messagez, keyz) => {
              messagez = thisMessage;
              keyz = parseInt(thisKey);
              console.log(typeof messagez, typeof keyz);
              setCiphertext(cipher(messagez, keyz));
            }}
            style={{ marginBottom: 1 }}
          >
            <LinearGradient
              style={[styles.button, { height: 30 }]}
              colors={["#43C6AC", "#191654"]}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>
                80 BIt Key
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(messagez, keyz) => {
              messagez = thisMessage;
              keyz = parseInt(thisKey);
              console.log(typeof messagez, typeof keyz);
              setCiphertext(cipher(messagez, keyz));
            }}
            style={{ marginBottom: 1 }}
          >
            <LinearGradient
              style={[styles.button, { height: 30 }]}
              colors={["#43C6AC", "#191654"]}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>
                128 BIt Key
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Text style={styles.Text}>Message:</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          multiline
          autoCorrect={false}
          value={thisMessage}
          numberOfLines={8}
          textAlignVertical={"top"}
          onChangeText={(newValue) => setMessage(newValue)}
        />

        <Text style={styles.Text}>Ciphertext:</Text>
        <TextInput
          style={styles.output}
          multiline={true}
          value={thisCiphertext}
          editable={false}
          textAlignVertical={"top"}
          numberOfLines={8}
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#a3ddcb",
        }}
      >
        {/* Encipher Button */}
        <TouchableOpacity
          onPress={(messagez, keyz) => {
            messagez = thisMessage;
            keyz = parseInt(thisKey);
            keysizez = parseInt(thisKeySize);
            console.log(typeof messagez, typeof keyz);
            setCiphertext(cipher(messagez, keyz, keysizez));
          }}
          style={{ marginBottom: 1 }}
        >
          <LinearGradient
            style={styles.button}
            colors={["#43C6AC", "#191654"]}
            start={[0, 0]}
            end={[1, 1]}
          >
            <Text style={styles.buttonText}>Encipher</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Clear Button */}
        <TouchableOpacity
          onPress={() => {
            setCiphertext("");
            setKey("");
            setMessage("");
          }}
        >
          <LinearGradient
            style={styles.button}
            colors={["#43C6AC", "#191654"]}
            start={[0, 0]}
            end={[1, 1]}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffe3de",
  },
  input: {
    margin: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  output: {
    margin: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    color: "black",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
    height: 75,
    justifyContent: "center",
    width: 145,
  },
  Text: {
    marginLeft: 20,
    color: "#0a043c",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default EncipherScreen2;
