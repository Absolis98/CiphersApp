import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={[styles.title,  {alignItems:"center", marginVertical: 8}]}>
          PRESENT Block Cipher!!
        </Text>
        <Text>
        The RSA crypto system is one that relies on factors and large prime numbers along with public and private keys. To create a key in RSA, two very large prime numbers which would be named p and q. The product of those numbers would also be calculated to generate a variable, N. Further, a variable T would be computed by multiplying (p-1)(q-1), called the Euler Totient. And to finish off these variable assignments, two numbers would be chosen, e and d, where the product of e and d modulus T would return 1. The rules for choosing e are that it must less than T and coprime with N, and the rules for choosing d are that when it is multiplied by a multiple of e the product must satisfy the equation of e*d mod T = 1 as mentioned previously. The public key comes from the values N and e, and the private key comes from N and d.
        </Text>
        <Image
          style={styles.image}
          source={require("../../assets/rsa.png")}
        />
        <Text style={{fontSize: 22}}>Encryption:</Text>
        <Image
          style={styles.image}
          source={require("../../assets/rsa2.png")}
        />
        <Text>
        To encrypt a plaintext message the letter would be assigned a value, and be sent through an equation where the value of the letter would be raised to the power of e, and that value would be modulus N. The resulting value after these operations, when translated using to plaintext using whatever values the user has assigned to each letter, would then return a ciphertext for the encrypted plaintext.
        </Text>
        <Text style={{fontSize: 22}}>Decryption</Text>
        <Image
          style={styles.image}
          source={require("../../assets/rsa3.png")}
        />
        <Text>
        To decrypt this ciphertext, it would then be raised to an exponent modulo N, expect this time the exponent would be the private value d instead of e. Once this is performed the resulting value will return the original plaintext. All these values that have been discussed, when using large prime numbers for p and q, become extremely large, and for the time being, the security of this cipher relies on the fact that numbers in this cipher are so large that it is nearly impossible for our current technology to decrypt with ease.
        </Text>
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
    height: 200,
    resizeMode: "contain",
    margin: 10
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
