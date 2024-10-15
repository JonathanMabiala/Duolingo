import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Button from "../Button";
import React, { useState } from "react";
import styles from "./styles";
import ImageOption from "../ImageOption";

const ImageMultipleChoiceQuestions = ({ question, onCorrect, onWrong }) => {
  const [selected, setSelected] = useState(null);

  const onButtonPress = () => {
    if (selected.correct) {
      onCorrect();

      setSelected(null);
    } else {
      onWrong();
    }
  };
  return (
    <>
      <Text style={styles.title}>{question.question}</Text>
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <ImageOption
            key={option.id}
            image={option.image}
            text={option.text}
            isSelected={selected?.id === option.id}
            onPress={() => setSelected(option)}
          />
        ))}
      </View>
      <Button text="Check" onPress={onButtonPress} disabled={!selected} />
    </>
  );
};

// ImageMultipleChoiceQuestions.propTypes = {
//   question: PropTypes.shape({
//     question: PropTypes.string.isRequired,
//     options: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         text: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         correct: PropTypes.bool,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default ImageMultipleChoiceQuestions;
