import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { SIZES, COLORS, FONTS } from "../constants";

const styles = StyleSheet.create({
  view: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.borderRadius,
    elevation: 5,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 2, height: 12 },
    shadowRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontFamily: FONTS.h1_semiBold.fontFamily,
    color: COLORS.primary,
    width: "60%",
  },
  checkbox: {
    marginRight: 15,
  },
  setTime: {
    backgroundColor: COLORS.accent,
    height: 30,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    borderRadius: 5,
  },
});

export default function Card(props) {
  return (
    <TouchableOpacity
      style={styles.view}
      onLongPress={() => props.deleteItem(props.index)}
    >
      <CheckBox
        style={styles.checkbox}
        value={props.data.isSelected}
        onValueChange={(value) => props.setIsSelected(props.index, value)}
      />
      <Text
        style={{
          ...styles.text,
          textDecorationLine: props.data.isSelected ? "line-through" : "none",
        }}
      >
        {props.data.text}
      </Text>
      <TouchableOpacity
        style={styles.setTime}
        onPress={() => {
          props.setIndex(props.index);
          props.setShow(true);
        }}
      >
        <Text style={{ fontFamily: FONTS.h1_semiBold.fontFamily }}>
          {props.data.time}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
