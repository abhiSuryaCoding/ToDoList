import { StyleSheet, Platform, StatusBar } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const backgroundImage = require("../../assets/planet.png");

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
    padding: SIZES.padding,
  },
  textBoxWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SIZES.padding,
  },
  textInput: {
    borderRadius: SIZES.textBoxRadius,
    backgroundColor: COLORS.secondary,
    height: 48,
    paddingLeft: 15,
    width: "90%",
    color: COLORS.primary,
    marginRight: 15,
    fontFamily: FONTS.h2_semiBold.fontFamily,
  },
  button: {
    backgroundColor: COLORS.accent,
    height: 48,
    width: 48,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 4,
  },
  heading: {
    color: COLORS.secondary,
    marginBottom: 20,
    fontSize: 22,
    fontFamily: FONTS.h1_semiBold.fontFamily,
    alignSelf: "center",
    marginBottom: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export { backgroundImage, style };
