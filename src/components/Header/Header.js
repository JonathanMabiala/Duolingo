import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgressBar from "../ProgressBar";
import heart from "../../../assets/images/heart.png";

const Header = ({ progress, lives }) => {
  return (
    <View style={styles.root}>
      <ProgressBar progress={progress} />

      <Image source={heart} style={styles.icon} resizeMode="contain" />
      <Text style={styles.lives}>{lives}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
  },
  lives: {
    color: "red",
    fontWeight: "bold",
  },
});
