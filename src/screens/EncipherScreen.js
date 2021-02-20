import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity } from 'react-native';


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


const EncipherScreen = ({ navigation }) => {
    const [thisKey, setKey] = useState('');
    const [thisMessage, setMessage] = useState('');
    const [thisCiphertext, setCiphertext] = useState('');


    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Please enter a key and a message to encipher.</Text>
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
            
            <Text style={styles.Text}>Ciphertext:</Text>
            <TextInput
                style={styles.output}
                multiline={true}
                value={thisCiphertext}
                editable={false}
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
    Text:{
        paddingVertical: 10,
        textAlign: 'center'

    }
});

export default EncipherScreen;