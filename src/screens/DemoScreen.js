import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';


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
  if (typeof (word) !== "string" || word === '' || typeof (key) !== "number" || key < 2 || isNaN(key))
    return () => alert("Please enter a valid Key and Message. The key must be equal to or greater than 2.");

  let newWord = trimString(word);
  let table = createTable(newWord.length, key);
  table = tableCreatePattern(table, newWord, key);


  // Extract ciphertext
  let ciphertext = "";
  for (let row = 0; row < key; row++) {
    for (let col = 0; col < newWord.length; col++) {
      if (table[row][col] !== undefined)
        ciphertext += table[row][col];
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
  if (typeof (word) !== "string" || word === '' || typeof (key) !== "number" || key < 2 || isNaN(key))
    return () => alert("Please enter a valid Key and Ciphertext. The key must be equal to or greater than 2.");
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
  const [thisKey, setKey] = useState('');
  const [thisMessage, setMessage] = useState('');
  const [thisCiphertext, setCiphertext] = useState('');
  const [thisOutput, setOutput] = useState('');
  let buttonList = [
    { name: "Example 1", message: "Hello World!", key: "2" },
    { name: "Example 2", message: "Dread it? Run from it? Destiny arrives all the same, and now it's here. Or should I say: I am", key: "4" },
    { name: "Example 3", message: "I used the Stones to destroy the Stones. It nearly killed me, but the work is done. It always will be.", key: "11" },
    { name: "Example 4", message: "Perfectly balanced... as all things should be", key: "7" },
    { name: "Example 5", message: "I know what it’s like to lose. To feel so desperately that you’re right, yet to fail nonetheless.", key: "2" },
    { name: "Example 6", message: "Little one, it’s a simple calculus. This universe is finite, its resources, finite. If life is left unchecked, life will cease to exist. It needs correcting.", key: "18" },
    { name: "Example 7", message: "Fun isn’t something one considers when balancing the universe. But this… does put a smile on my face.", key: "6" },
    { name: "Example 8", message: "The hardest choices require the strongest wills.", key: "9" },
  ];

  return (
    <View style={styles.container}>
      <Text>Please enter a key and a message to encipher.</Text>
      <Text>Key:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={thisKey.toString()}
        onChangeText={(newValue) => setKey(newValue)}
      />
      <Text>Message:</Text>
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

      <Text>Output:</Text>
      <TextInput
        style={styles.output}
        multiline={true}
        value={thisOutput}
        editable={false}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={buttonList}
        keyExtractor={(button) => button.name}
        renderItem={({ item }) => {
          return (
            <Button
              title={item.name}
              onPress={() => {
                setKey(item.key);
                setMessage(item.message);
                setOutput("");
              }}
            />
          )
        }}
      />

      <TouchableOpacity 
                style={styles.button}
                onPress={(messagez, keyz) => {
                    messagez = thisMessage;
                    keyz = parseInt(thisKey);
                    console.log(typeof(messagez), typeof(keyz));
                    setCiphertext(cipher(messagez, keyz));
                }}
                >
                    <Text style={styles.Text}>Encipher</Text>
              </TouchableOpacity>

      <TouchableOpacity 
                style={styles.button}
                onPress={(messagez, keyz) => {
                    messagez = thisMessage;
                    keyz = parseInt(thisKey);
                    console.log(messagez,keyz);
                    setCiphertext(decipher(messagez, keyz));
                }}
                >
                    <Text style={styles.Text}>Decipher</Text>
              </TouchableOpacity>

      <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setCiphertext("");
                    setKey("");
                    setMessage("");
                }}
              >
                    <Text style={styles.Text}>Clear</Text>
              </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  output: {
    margin: 15,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft:30,
    marginRight:30,
    marginVertical: 10,
    backgroundColor:'#00BCD4',
    borderRadius: 10,
    borderWidth: 1
},
});

export default CipherScreen;