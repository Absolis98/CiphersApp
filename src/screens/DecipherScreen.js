import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
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
        "Please enter a valid Key and Ciphertext. The key must be equal to or greater than 2."
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

const DecipherScreen = ({ navigation }) => {
  const [thisKey, setKey] = useState("");
  const [thisMessage, setMessage] = useState("");
  const [thisCiphertext, setCiphertext] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>
        Please enter a key and a ciphertext to decipher.
      </Text>
      <Text style={styles.Text}>Key:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={thisKey.toString()}
        onChangeText={(newValue) => setKey(newValue)}
      />
      <Text style={styles.Text}>Ciphertext:</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        multiline={true}
        autoCorrect={false}
        value={thisMessage}
        onChangeText={(newValue) => setMessage(newValue)}
      />

      <Text style={styles.Text}>Plaintext:</Text>
      <TextInput
        style={styles.output}
        multiline={true}
        value={thisCiphertext}
        editable={false}
      />

      {/* Decipher Button */}
      <TouchableOpacity
        onPress={(messagez, keyz) => {
          messagez = thisMessage;
          keyz = parseInt(thisKey);
          console.log(messagez, keyz);
          setCiphertext(decipher(messagez, keyz));
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
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
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
});

export default DecipherScreen;
