import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title} alignItems={"center"}>
          K-Rail Fence Cipher!!
        </Text>
        <Text>
          The rail fence cipher is a transposition cipher (meaning it rearranges
          the plaintext characters to form the ciphertext). To do a rail fence
          cipher, one must establish the value for the key (k) and the length
          (l) of the message. The key must be a number greater than or equal to
          2. Once both values are set, we create a table of l columns and k
          rows. The plaintext is written down as a sequence of diagonals and is
          then read off as a sequence of rows.
        </Text>
        <Text>For example, assume the value k=3</Text>
        <Text>and the message "Hello Ray":</Text>
        <Image
          style={styles.image}
          source={require("../../assets/example.png")}
        />
        <Text>The ciphertext is read across as:</Text>
        <Text>HOELRYLA</Text>
        <Text>
          To decipher, create a table with l columns and k rows. Insert
          placeholders in a zig zag fassion.
        </Text>
        <Image
          style={styles.image}
          source={require("../../assets/placeholders.png")}
        />
        <Text>
          Replace the placeholders with characters from the ciphertext. Start
          from the top left and make your way across each row.
        </Text>
        <Image
          style={styles.image}
          source={require("../../assets/replace.png")}
        />
        <Text>Read along the diagonals to obtain the original message.</Text>
        <Image
          style={styles.image}
          source={require("../../assets/example.png")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#ffe3de",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "105%",
    height: 120,
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

export default HomeScreen;
