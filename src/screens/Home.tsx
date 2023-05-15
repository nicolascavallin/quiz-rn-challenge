import { StackScreenProps } from "@react-navigation/stack";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";

type Props = StackScreenProps<RootStackParamList, "Home">;

const HomeScreen: FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: "yellow",
        }}
        onPress={() => navigate("Game")}
      >
        <Text>Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 8,
          backgroundColor: "yellow",
        }}
        onPress={() => navigate("Score")}
      >
        <Text>Score</Text>
      </TouchableOpacity>
    </View>
  );
};

export { HomeScreen };
