import { Text, View, Image, TextInput } from "react-native";
import styles from "./styles";
import React, { useState } from "react";
import mascot from "../../../assets/images/mascot.png";
import Button from "../Button";

const OpenEndedQuestions = ({ question, onCorrect, onWrong }) => {
  const [input, setInput] = useState("");

  const onButtonPress = () => {
    if (question.answer.toLowerCase().trim() === input.toLowerCase().trim()) {
      onCorrect();
    } else {
      onWrong();
    }
    setInput("");
  };
  return (
    <>
      <Text style={styles.title}>Translate this sentence</Text>
      <View style={styles.row}>
        <Image source={mascot} style={styles.mascot} resizeMode="contain" />

        <View style={styles.sentenceContainer}>
          <Text style={styles.sentence}>{question.text}</Text>
        </View>

        {/* sentence container*/}
      </View>
      <TextInput
        value={input}
        onChangeText={(changedText) => setInput(changedText)}
        placeholder="Type in English"
        style={styles.textInput}
        textAlignVertical="top"
        multiline
      />
      <Button text="Check" onPress={onButtonPress} disabled={!input} />
    </>
  );
};

export default OpenEndedQuestions;
