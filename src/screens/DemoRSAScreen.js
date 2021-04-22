import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedbackBase
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { encrypt, decrypt, generateKeys } from "../algorithms/rsa";

const DemoScreen2 = ({ navigation }) => {
  const [thisKey, setKey] = useState(["none", "none", "none"]);
  const [thisKeySize, setKeySize] = useState(80);
  const [btn1Selected, setBtn1Selected] = useState(["#43C6AC", "#191654"]);
  const [btn2Selected, setBtn2Selected] = useState(["#226d5e", "#0d0c2c"]);
  const [thisMessage, setMessage] = useState("");
  const [thisPlaintext, setPlaintext] = useState("");
  const [thisCiphertext, setCiphertext] = useState("");
  const [thisOutput, setOutput] = useState("");

  const toggleSelected = (btnNum) => {
    if (btnNum === 1) {
      setBtn1Selected(["#43C6AC", "#191654"]);
      setBtn2Selected(["#226d5e", "#0d0c2c"]);
    } else if (btnNum === 2) {
      setBtn1Selected(["#226d5e", "#0d0c2c"]);
      setBtn2Selected(["#43C6AC", "#191654"]);
    }
  };

  let buttonList = [
    { name: "Demo 1", type: "plaintext", message: "Hello World", key: "aaaaaaaaaa", keySize: "80" },
    {
      name: "Demo 2",
      type: "ciphertext",
      message:
        "0FD763A3925D27E14A377A4A58497D896B7829949B03603B700E36CDC5E312FE97751DECC71BDFD1517C481D5BD4E00DA5BB188B2F92637FA7F63B1A01969C04B580D68BFB9BAFF4",
      key: "Strawberry",
      keySize: "80"
    },
    {
      name: "Demo 3",
      type: "plaintext",
      message:
        "I used the Stones to destroy the Stones It nearly killed me but the work is done It always will be",
      key: "Government",
      keySize: "128"
    },
    {
      name: "Demo 4",
      type: "plaintext",
      message:
        "I know what its like to lose To feel so desperately that youre right, yet to fail nonetheless",
      key: "Technology",
      keySize: "128"
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 4 }}>
        <Text style={[styles.Text, {marginTop: 10}]}>
          Please generate a key and type in a message to encipher.
        </Text>
        <Text style={styles.Text}>Keys:</Text>
        <Text style={[styles.Text, {marginTop: 10}]}>Public Key (e, n): {"(" + thisKey[0] + ", " + thisKey[2] + ")"}</Text>
        <Text style={[styles.Text, {marginTop: 10}]}>Private Key (d, n): {"(" + thisKey[1] + ", " + thisKey[2] + ")"}</Text>
          <TouchableOpacity
            onPress={() => {
              let keys = generateKeys();
              setKey(keys);
              console.log(thisKey);
            }}
            style={{ marginBottom: 1 }}
          >
            <LinearGradient
              style={[styles.button, { height: 45, width: "80%", justifyContent: 'center' }]}
              colors={btn1Selected}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={[styles.buttonText, { fontSize: 15 }]}>
                Generate Key
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        <Text style={styles.Text}>Message:</Text>
        <TextInput
          style={styles.input}
          textAlignVertical={"top"}
          autoCapitalize="none"
          multiline={true}
          autoCorrect={false}
          value={thisMessage}
          numberOfLines={5}
          onChangeText={(newValue) => {
            setMessage(newValue);
            setPlaintext(newValue);
            setCiphertext(newValue);
          }}
        />

        {/* <Text>Ciphertext:</Text>
            <TextInput
                style={styles.output}
                multiline={true}
                value={thisCiphertext}
                editable={false}
            /> */}

        <Text style={styles.Text}>Output:</Text>
        <TextInput
          style={styles.output}
          multiline={true}
          value={thisOutput[0]}
          editable={false}
          numberOfLines={5}
          textAlignVertical={"top"}
        />
      </ScrollView>

      <View style={{ flex: 0.5, backgroundColor: "#a3ddcb" }}>
        <View style={styles.listContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={buttonList}
            keyExtractor={(button) => button.name}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.type === "plaintext") {
                      setPlaintext(item.message);
                      setCiphertext("");
                    } else if (item.type === "ciphertext") {
                      setCiphertext(item.message);
                      setPlaintext("");
                    }
                    setKey(item.key);
                    setKeySize(item.keySize);
                    setMessage(item.message);
                    setOutput("");
                  }}
                >
                  <LinearGradient
                    style={[
                      styles.button,
                      { height: 60, justifyContent: "center", width: 95, marginLeft: 13, marginRight: 13 },
                    ]}
                    colors={["#43C6AC", "#191654"]}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text style={[styles.buttonText, { fontSize: 17}]}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Encrypt Button */}
        <View style={styles.rowContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={(messagez, keyz) => {
                messagez = thisPlaintext;
                keyz = thisKey;
                let ciphertext = encrypt(messagez, keyz);
                console.log(typeof ciphertext);
                if (!(typeof ciphertext === "function")) {
                  setCiphertext(ciphertext);
                  setOutput(ciphertext);
                }
              }}
            >
              <LinearGradient
                style={styles.button}
                colors={["#43C6AC", "#191654"]}
                start={[0, 0]}
                end={[1, 1]}
              >
                <Text style={styles.buttonText}>Encrypt</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Decipher Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={(messagez, keyz) => {
                messagez = thisCiphertext;
                keyz = thisKey;
                let plaintext = decrypt(messagez, keyz);
                console.log(typeof plaintext);
                if (!(typeof plaintext === "function")) {
                  setPlaintext(plaintext);
                  setOutput(plaintext);
                }
              }}
            >
              <LinearGradient
                style={styles.button}
                colors={["#43C6AC", "#191654"]}
                start={[0, 0]}
                end={[1, 1]}
              >
                <Text style={styles.buttonText}>Decrypt</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clear Button */}
        <TouchableOpacity
          onPress={() => {
            setCiphertext("");
            setPlaintext("");
            setKey(["none", "none", "none"]);
            setMessage("");
            setOutput("");
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
    justifyContent: "center",
    flex: 1,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 30,
    marginRight: 30,
    marginVertical: 10,
    backgroundColor: "#00BCD4",
    borderRadius: 10,
    borderWidth: 1,
  },
  Text: {
    marginLeft: 20,
    fontSize: 15
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: "#a3ddcb",
  },
});

export default DemoScreen2;
