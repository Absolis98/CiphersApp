import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function trimString(word) {
  let newWord = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== " ") {
      newWord += word[i];
    }
  }
  return newWord.toUpperCase();
}

function createTable(length, key) {
  // creates rows
  let table = new Array(key);

  // creates columns
  for (let col = 0; col < table.length; col++) {
    table[col] = new Array(length);
  }
  return table;
}

function tableCreatePattern(table, word, key) {
  let row = -1;
  let sign = 1;
  for (let col = 0; col < word.length; col++) {
    if (row === key - 1) {
      sign = -1;
    }
    if (row === 0) {
      sign = 1;
    }

    row += sign;

    table[row][col] = word[col];
  }
  return table;
}

function cipher(word, key) {
  if (
    typeof word !== "string" ||
    word === "" ||
    typeof key !== "number" ||
    key < 2 ||
    isNaN(key)
  )
    return () =>
      alert(
        "Please enter a valid Key and Message. The key must be equal to or greater than 2."
      );

  let newWord = trimString(word);
  let table = createTable(newWord.length, key);
  table = tableCreatePattern(table, newWord, key);

  // Extract ciphertext
  let ciphertext = "";
  for (let row = 0; row < key; row++) {
    for (let col = 0; col < newWord.length; col++) {
      if (table[row][col] !== undefined) ciphertext += table[row][col];
    }
  }

  return ciphertext;
}

function createPlaceholder(length) {
  let placeholder = "";
  for (let i = 0; i < length; i++) {
    placeholder += "-";
  }
  return placeholder;
}

function decipher(word, key) {
  if (
    typeof word !== "string" ||
    word === "" ||
    typeof key !== "number" ||
    key < 2 ||
    isNaN(key)
  )
    return () =>
      alert(
        "Please ensure you have entered a valid Key and Ciphertext. The key must be equal to or greater than 2."
      );
  word = trimString(word);
  let placeholder = createPlaceholder(word.length);
  let table = createTable(word.length, key);
  table = tableCreatePattern(table, placeholder, key);

  // replace "-" with characters from the cipherteext
  let counter = 0;
  for (let row = 0; row < key; row++) {
    for (let col = 0; col < word.length; col++) {
      if (table[row][col] === "-") {
        table[row][col] = word[counter];
        counter++;
      }
    }
  }

  // extract plaintext
  let plaintext = "";
  let row = -1;
  let sign = 1;
  for (let col = 0; col < word.length; col++) {
    if (row === key - 1) {
      sign = -1;
    }
    if (row === 0) {
      sign = 1;
    }

    row += sign;

    plaintext += table[row][col];
  }

  return plaintext;
}

const CipherScreen = ({ navigation }) => {
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
      <Text style={styles.Text}>
        Please enter a key and a message to encipher.
      </Text>
      <Text style={styles.Text}>Key:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={thisKey.toString()}
        onChangeText={(newValue) => setKey(newValue)}
      />
      <Text style={styles.Text}>Message:</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        multiline={true}
        autoCorrect={false}
        value={thisMessage}
        onChangeText={(newValue) => setMessage(newValue)}
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
        // editable={false}
      />

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
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  input: {
    margin: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  output: {
    margin: 15,
    color: "black",
    borderColor: "black",
    borderWidth: 1,
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
    borderWidth: 1,
  },
});

export default CipherScreen;
