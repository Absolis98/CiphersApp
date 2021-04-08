import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { decrypt } from "../algorithms/PRESENT";

const DecipherScreen2 = ({ navigation }) => {
  const [thisKey, setKey] = useState("");
  const [thisKeySize, setKeySize] = useState(80);
  const [btn1Selected, setBtn1Selected] = useState(["#43C6AC", "#191654"]);
  const [btn2Selected, setBtn2Selected] = useState(["#226d5e", "#0d0c2c"]);
  const [thisMessage, setMessage] = useState("");
  const [thisCiphertext, setCiphertext] = useState("");

  const toggleSelected = (btnNum) => {
    if (btnNum === 1) {
      setBtn1Selected(["#43C6AC", "#191654"]);
      setBtn2Selected(["#226d5e", "#0d0c2c"]);
    } else if (btnNum === 2) {
      setBtn1Selected(["#226d5e", "#0d0c2c"]);
      setBtn2Selected(["#43C6AC", "#191654"]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 5 }}>
        <Text style={styles.Text}>
          Please enter a key and a ciphertext to decipher.
        </Text>
        <Text style={styles.Text}>Key:</Text>
        <TextInput
          style={[styles.input, { paddingTop: 0 }]}
          value={thisKey.toString()}
          numberOfLines={1}
          onChangeText={(newValue) => setKey(newValue)}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={() => {
              setKeySize(80);
              toggleSelected(1);
              console.log(thisKeySize);
            }}
            style={{ marginBottom: 1 }}
          >
            <LinearGradient
              style={[styles.button, { height: 30 }]}
              colors={btn1Selected}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>
                80 Bit Key
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setKeySize(128);
              toggleSelected(2);
              console.log(thisKeySize);
            }}
            style={{ marginBottom: 1 }}
          >
            <LinearGradient
              style={[styles.button, { height: 30 }]}
              colors={btn2Selected}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>
                128 Bit Key
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={styles.Text}>Ciphertext:</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          multiline={true}
          autoCorrect={false}
          value={thisMessage}
          numberOfLines={8}
          textAlignVertical={"top"}
          onChangeText={(newValue) => setMessage(newValue)}
        />

        <Text style={styles.Text}>Plaintext:</Text>
        <TextInput
          style={styles.output}
          multiline={true}
          value={thisCiphertext}
          // editable={false}
          textAlignVertical={"top"}
          numberOfLines={8}
        />
      </ScrollView>

      <View
        style={{
          flex: 0.17,
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#a3ddcb",
        }}
      >
        {/* Decipher Button */}
        <TouchableOpacity
          onPress={(messagez, keyz, keysizez) => {
            messagez = thisMessage;
            keyz = thisKey.toUpperCase();
            keysizez = parseInt(thisKeySize);
            console.log(messagez, keyz);
            setCiphertext(decrypt(messagez, keyz, keysizez));
          }}
        >
          <LinearGradient
            style={styles.button}
            colors={["#43C6AC", "#191654"]}
            start={[0, 0]}
            end={[1, 1]}
          >
            <Text style={styles.buttonText}>Decipher</Text>
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
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default DecipherScreen2;
