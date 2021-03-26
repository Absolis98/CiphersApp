import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cipher, decipher } from "../algorithms/PRESENT";

const DemoScreen2 = ({ navigation }) => {
  const [thisKey, setKey] = useState("");
  const [thisMessage, setMessage] = useState("");
  const [thisPlaintext, setPlaintext] = useState("");
  const [thisCiphertext, setCiphertext] = useState("");
  const [thisOutput, setOutput] = useState("");
  let buttonList = [
    { name: "Demo 1", type: "plaintext", message: "Hello World!", key: "2" },
    {
      name: "Demo 2",
      type: "ciphertext",
      message:
        "DTRDYEH,WESIARI?FO?ENAVSTEEAOIHRRHDSIMEDRNMTSIRIALSMNNTSEOOLA:AUITRLAD'.UY",
      key: "4",
    },
    {
      name: "Demo 3",
      type: "plaintext",
      message:
        "I used the Stones to destroy the Stones. It nearly killed me, but the work is done. It always will be.",
      key: "11",
    },
    {
      name: "Demo 4",
      type: "ciphertext",
      message: "PALDELNLTLBRACAHUEFBESIOEYDANHCL..GST.S",
      key: "7",
    },
    {
      name: "Demo 5",
      type: "plaintext",
      message:
        "I know what it’s like to lose. To feel so desperately that you’re right, yet to fail nonetheless.",
      key: "2",
    },
    {
      name: "Demo 6",
      type: "ciphertext",
      message:
        "LUTEISNIECATIIN.LSTHVIILELTEFFITE.R,LWO.OSSSIEEGNUEEFFXNELICEIII,USRILSTICFUS,TCTLIOLD.E’ANSEEIRSCIEFKTRAETRTCNOSLESUEECIP,TNHESMICD",
      key: "18",
    },
    {
      name: "Demo 7",
      type: "plaintext",
      message:
        "Fun isn’t something one considers when balancing the universe. But this… does put a smile on my face.",
      key: "6",
    },
    {
      name: "Demo 8",
      type: "ciphertext",
      message: "TSGHERNEECEOSHIQRTAOUTWRHISIDCRELETEHL.STS",
      key: "9",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flex: 4 }}>
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
          value={thisOutput}
          editable={false}
          numberOfLines={5}
          textAlignVertical={"top"}
        />
      </View>

      <View style={{ flex: 2, backgroundColor: "#a3ddcb" }}>
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
                    setMessage(item.message);
                    setOutput("");
                  }}
                >
                  <LinearGradient
                    style={[
                      styles.button,
                      { height: 75, justifyContent: "center", width: 95 },
                    ]}
                    colors={["#43C6AC", "#191654"]}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text style={styles.buttonText}>{item.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Encipher Button */}
        <View style={styles.rowContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={(messagez, keyz) => {
                messagez = thisPlaintext;
                keyz = parseInt(thisKey);
                let ciphertext = cipher(messagez, keyz);
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
                <Text style={styles.buttonText}>Encipher</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Decipher Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={(messagez, keyz) => {
                messagez = thisCiphertext;
                keyz = parseInt(thisKey);
                let plaintext = decipher(messagez, keyz);
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
                <Text style={styles.buttonText}>Decipher</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clear Button */}
        <TouchableOpacity
          onPress={() => {
            setCiphertext("");
            setPlaintext("");
            setKey("");
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
  },
  buttonText: {
    color: "white",
    textAlign: "center",
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
