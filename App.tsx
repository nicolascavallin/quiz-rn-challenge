import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppProvider } from "./src/context";
import { HomeScreen } from "./src/screens/Home";
import { GameScreen } from "./src/screens/Game";
import { ScoreScreen } from "./src/screens/Score";

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Score: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Score" component={ScoreScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;

export type { RootStackParamList };
