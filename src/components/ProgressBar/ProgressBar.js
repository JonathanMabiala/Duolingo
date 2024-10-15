import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.bg}>
      <View style={[styles.fg, { width: `${progress * 100}%` }]}>
        <View style={styles.highlight} />
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "lightgrey",
    height: 30,
    borderRadius: 15,
    flex: 1,
  },
  fg: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "#FAC800",
  },
  highlight: {
    backgroundColor: "#FAD131",

    width: "90%",
    height: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: "center",
  },
});
