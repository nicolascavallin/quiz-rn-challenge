import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApp } from "../context/hook";
import useCountdown from "@bradgarropy/use-countdown";
import Animated, {
  FadeInRight,
  FadeOut,
  SlideInRight,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    margin: 16,
  },
  answerContainer: {
    padding: 12,
    margin: 8,
    backgroundColor: "#a9a9a9",
    borderRadius: 8,
  },
  answerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
});

const GameScreen = () => {
  const { formatted, reset } = useCountdown({
    seconds: 10,
    format: "m:ss",
    // onCompleted: () => handleChooseAnswer(null),
  });
  const [activeQuestion, setActiveQuestion] = useState(0);

  const {
    state: { questions, answers },
    actions: { saveAnswer },
  } = useApp();

  const handleChooseAnswer = (answer: string | null) => {
    const points = 5;
    saveAnswer(questions[activeQuestion], answer, points);
    reset();
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111111" }}>
      <Text style={styles.title}>{questions[activeQuestion].question}</Text>

      {questions[activeQuestion].answers.map((answer, index) => (
        <Animated.View
          key={answer}
          entering={SlideInRight.delay(1000)
            .delay(200 * index + 2)
            .springify()
            .damping(32)
            .stiffness(500)}
          exiting={FadeOut.duration(200)}
        >
          <TouchableOpacity
            onPress={() => handleChooseAnswer(answer)}
            style={styles.answerContainer}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Text style={{ color: "#fff" }}>
        PUNTOS: {answers.reduce((acc, curr) => acc + curr.points, 0)}
      </Text>
      <Text style={{ color: "#fff" }}>TIEMPO: {formatted}</Text>
    </View>
  );
};

export { GameScreen };
