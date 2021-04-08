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
import { encrypt, decrypt } from "../algorithms/PRESENT";

const DemoScreen2 = ({ navigation }) => {
  const [thisKey, setKey] = useState("");
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
        "DD6462BA902CF5C4B5085A7F3208A117",
      key: "Strawberry",
      keySize: "80"
    },
    {
      name: "Demo 3",
      type: "plaintext",
      message:
        "I used the Stones to destroy the Stones. It nearly killed me, but the work is done. It always will be.",
      key: "11",
      keySize: "128"
    },
    {
      name: "Demo 4",
      type: "ciphertext",
      message: "PALDELNLTLBRACAHUEFBESIOEYDANHCL..GST.S",
      key: "7",
      keySize: "80"
    },
    {
      name: "Demo 5",
      type: "plaintext",
      message:
        "I know what it’s like to lose. To feel so desperately that you’re right, yet to fail nonetheless.",
      key: "2",
      keySize: "128"
    },
    {
      name: "Demo 6",
      type: "ciphertext",
      message:
        "LUTEISNIECATIIN.LSTHVIILELTEFFITE.R,LWO.OSSSIEEGNUEEFFXNELICEIII,USRILSTICFUS,TCTLIOLD.E’ANSEEIRSCIEFKTRAETRTCNOSLESUEECIP,TNHESMICD",
      key: "18",
      keySize: "80"
    },
    {
      name: "Demo 7",
      type: "plaintext",
      message:
        "Fun isn’t something one considers when balancing the universe. But this… does put a smile on my face.",
      key: "6",
      keySize: "128"
    },
    {
      name: "Demo 8",
      type: "ciphertext",
      message: "TSGHERNEECEOSHIQRTAOUTWRHISIDCRELETEHL.STS",
      key: "9",
      keySize: "80"
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 4 }}>
        <Text style={styles.Text}>
          Please enter a key and a message to encipher.
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
              onPress={(messagez, keyz, keysizez) => {
                messagez = thisPlaintext;
                keyz = thisKey.toUpperCase();
                keysizez = parseInt(thisKeySize);
                let ciphertext = encrypt(messagez, keyz, keysizez);
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
              onPress={(messagez, keyz, keysizez) => {
                messagez = thisCiphertext;
                keyz = thisKey.toUpperCase();
                keysizez = parseInt(thisKeySize);
                let plaintext = decrypt(messagez, keyz, keysizez);
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
