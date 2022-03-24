import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { SIZES, COLORS } from "../constants";

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
  },
  text: {
    color: COLORS.primary,
  },
  checkbox: {
    marginRight: 15,
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
    </TouchableOpacity>
  );
}
