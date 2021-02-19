import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, FlatList } from 'react-native';


function trimString(word) {
    let newWord = "";
    for(let i = 0; i < word.length; i++) {
      if(word[i] !== " ") {
        newWord += word[i];
      }
    }
    return newWord.toUpperCase();
}
  
function createTable(length, key) {
    // creates rows
    let table = new Array(key);
  
    // creates columns
    for(let col = 0; col < table.length; col++) {
      table[col] = new Array(length);
    }
    return table;
}
  
function tableCreatePattern(table, word, key) {
    let row = -1;
    let sign = 1;
    for(let col = 0; col < word.length; col++) {
      if(row === key-1) {
        sign = -1;
      }
      if(row === 0) {
        sign = 1;
      }
  
      row += sign;
      
      table[row][col] = word[col];
    }
    return table;
}

function cipher(word, key) {
    if(typeof(word) !== "string" || word === '' || typeof(key) !== "number" || key < 2 || isNaN(key))
      return () => alert("Please enter a valid Key and Message. The key must be equal to or greater than 2.");
  
    let newWord = trimString(word);
    let table = createTable(newWord.length, key);
    table = tableCreatePattern(table, newWord, key);
  
    
    // Extract ciphertext
    let ciphertext = "";
    for(let row = 0; row < key; row++) {
      for(let col = 0; col < newWord.length; col++) {
        if(table[row][col] !== undefined)
          ciphertext += table[row][col];
      }
    }
  
    return ciphertext;
}

function createPlaceholder(length) {
    let placeholder = "";
    for(let i = 0; i < length; i++) {
      placeholder += "-";
    }
    return placeholder;
}

function decipher(word, key) {
    if(typeof(word) !== "string" || word === '' || typeof(key) !== "number" || key < 2 || isNaN(key))
        return () => alert("Please enter a valid Key and Ciphertext. The key must be equal to or greater than 2.");
    word = trimString(word);
    let placeholder = createPlaceholder(word.length);
    let table = createTable(word.length, key);
    table = tableCreatePattern(table, placeholder, key);
  
    // replace "-" with characters from the cipherteext
    let counter = 0;
    for(let row = 0; row < key; row++) {
      for(let col = 0; col < word.length; col++) {
        if(table[row][col] === "-") {
          table[row][col] = word[counter];
          counter++;
        }
      }
    }
  
    // extract plaintext
    let plaintext = "";
    let row = -1;
    let sign = 1;
    for(let col = 0; col < word.length; col++) {
      if(row === key-1) {
        sign = -1;
      }
      if(row === 0) {
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

            <Text>Ciphertext:</Text>
            <TextInput
                style={styles.output}
                multiline={true}
                value={thisCiphertext}
                editable={false}
            />
            
            <Text>Output:</Text>
            <TextInput
                style={styles.output}
                multiline={true}
                value={thisOutput}
                editable={false}
            />

            <Button 
                title="Encipher"
                style={styles.button}
                onPress={(messagez, keyz) => {
                    messagez = thisMessage;
                    keyz = parseInt(thisKey);
                    console.log(messagez, keyz);
                    setCiphertext(cipher(messagez, keyz));
                    
                }}
            />

            <Button 
                title="Decipher"
                style={styles.button}
                onPress={(messagez, keyz) => {
                    messagez = thisMessage;
                    keyz = parseInt(thisKey);
                    console.log(messagez, keyz);
                    setCiphertext(decipher(messagez, keyz));
                }}
            />  
            <Button 
                title="Clear"
                style={styles.button}
                onPress={() => {
                    setKey("");
                    setMessage("");
                    setOutput("");
                }}
            />

            {/* <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={}
                keyExtractor={}
                renderItem={({ item }) => {
                  return(
                    <Button />
                  )
                }}
            /> */}

            <Button
                title="Example 1"
                onPress={() => {
                  setKey("2");
                  setMessage("Hello World!");
                }}
            />

            <Button
                title="Example 2"
                onPress={() => {
                  setKey("3");
                  setMessage("Perfectly balanced... as all things should be");
                }}
            />

              <Button
                title="Example 3"
                onPress={() => {
                  setKey("3");
                  setMessage("Dread it? Run from it? Destiny arrives all the same, and now it's here. Or should I say: I am");
                }}
            />
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
        marginVertical: 10,
        borderRadius: 5
    }
});

export default CipherScreen;