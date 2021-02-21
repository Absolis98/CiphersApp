import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

const CipherButton = ({ navigation, title }) => {
  const screenList = [{ key: "1" }, {}];

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.push("CipherTabScreen")}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "yellow",
    alignSelf: "baseline",
  },
  button: {
    flex: 1,
    backgroundColor: "purple",
  },
  buttonTitle: {
    color: "pink",
  },
});

export default CipherButton;
