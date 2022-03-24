import * as React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Homepage } from "./src/screens";

export default function App() {
  return <Homepage></Homepage>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
