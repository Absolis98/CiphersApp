import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";

const CipherInfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>K-Rail Fence Cipher!!</Text>
      <Text>
        The rail fence cipher is a transposition cipher (meaning it rearranges
        the plaintext characters to form the ciphertext). To do a rail fence
        cipher, one must establish the value for the key (k) and the length (l)
        of the message. The key must be a number greater than or equal to 2.
        Once both values are set, we create a table of l columns and k rows. The
        plaintext is written down as a sequence of diagonals and is then read
        off as a sequence of rows.
      </Text>
      <Text>For example, assume the value k=3</Text>
      <Image
        style={styles.image}
        source={require("../../assets/example.png")}
      />
      <Text>Navigation Instructions:</Text>
      <View>
        <Text>
          Use the tab navigation buttons located at the bottom of the screen to
          switch between screens
        </Text>
        <Text>Cipher: Enter a message and key to receive the ciphertext</Text>
        <Text>
          Decipher: Enter ciphertext and the key to receive the plaintext
        </Text>
        <Text>Demo: Play with examples</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "105%",
    height: "30%",
    resizeMode: "contain",
  },
  navText: {
    margin: 40,
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default CipherInfoScreen;
