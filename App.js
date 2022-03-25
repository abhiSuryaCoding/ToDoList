import * as React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Homepage } from "./src/screens";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/ComicNeue-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  } else {
    return <Homepage></Homepage>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
