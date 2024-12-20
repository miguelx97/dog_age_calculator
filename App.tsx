import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, DefaultTheme, PaperProvider } from "react-native-paper";
import Home from "./src/screens/Home";
import theming from "./assets/theming.json";
import "@expo/metro-runtime";
import DogDataContextProvider from "./src/store/dog-data-context";

// Extend the default theme
const theme = {
  ...DefaultTheme,
  colors: theming.colors, // Copy it from the color codes scheme and then use it here
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <DogDataContextProvider>
        <Home />
      </DogDataContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
