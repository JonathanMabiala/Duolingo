import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import styles from "./App.styles";

import ImageMultipleChoiceQuestions from "./src/components/ImageMultipleChoiceQuestion";
import OpenEndedQuestions from "./src/components/OpenEndedQuestions";
import questions from "./assets/data/allQuestions";
import Header from "./src/components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[currentQuestionIndex]
  );
  const [lives, setLives] = useState(5);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      Alert.alert("You won");
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      saveData();
    }
  }, [lives, currentQuestionIndex, hasLoaded]);

  const restart = () => {
    setLives(5);
    setCurrentQuestionIndex(0);
  };
  const onCorrect = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const onWrong = () => {
    if (lives <= 1) {
      Alert.alert("Game over", "Try again", [
        {
          text: "Try again",
          onPress: restart,
        },
      ]);
    } else {
      Alert.alert("Wroooong");
      setLives(lives - 1);
      saveData();
    }
  };
  const saveData = async () => {
    await AsyncStorage.setItem("lives", lives.toString());
    await AsyncStorage.setItem(
      "currentQuestionIndex",
      currentQuestionIndex.toString()
    );
  };

  const loadData = async () => {
    const loadedLives = await AsyncStorage.getItem("lives");
    if (loadedLives) {
      setLives(parseInt(loadedLives));
    }

    const loadedCurrentQuestionIndex = await AsyncStorage.getItem(
      "currentQuestionIndex"
    );
    if (loadedCurrentQuestionIndex) {
      setCurrentQuestionIndex(parseInt(loadedCurrentQuestionIndex));
    }

    setHasLoaded(true);
  };

  if (!hasLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.root}>
      <Header
        progress={currentQuestionIndex / questions.length}
        lives={lives}
      />
      {currentQuestion.type === "IMAGE_MULTIPLE_CHOICE" && (
        <ImageMultipleChoiceQuestions
          question={currentQuestion}
          onCorrect={onCorrect}
          onWrong={onWrong}
        />
      )}
      {currentQuestion.type === "OPEN_ENDED" && (
        <OpenEndedQuestions
          question={currentQuestion}
          onCorrect={onCorrect}
          onWrong={onWrong}
        />
      )}
    </View>
  );
};

export default App;
