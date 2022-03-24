import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
} from "react-native";
import { Card } from "../Components";
import { COLORS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    fontSize: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default function Homepage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("task_list_key");
      if (jsonValue !== null) {
        setList(JSON.parse(jsonValue));
      }
    } catch (e) {
      alert(e);
    }
  };

  const saveData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("task_list_key", jsonValue);
    } catch (e) {
      alert(e);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("task_list_key");
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function addText(text) {
    if (value !== "") {
      setList((prev) => {
        const newList = [
          ...prev, //spread operator to copy text into prev array
          {
            text,
            isSelected: false,
          },
        ];
        saveData(newList);
        return newList;
      });
      setValue("");
    } else {
      alert("Please Type in something!");
    }
  }

  function deleteItem(idx) {
    Alert.alert("Are your sure?", "Are you sure you want to Undo this Task?", [
      {
        text: "Yes",
        onPress: () => {
          const data = list.filter((item, index) => index !== idx);
          setList(data);
          removeData();
          saveData(data);
        },
      },
      {
        text: "Cancle",
      },
    ]);
  }

  function setIsSelected(index, value) {
    let data = [];
    for (let i = 0; i < list.length; i++) {
      if (index === i) {
        data.push({ ...list[i], isSelected: value });
      } else {
        data.push(list[i]);
      }
    }
    setList(data);
  }

  return (
    <ImageBackground source={backgroundImage} style={style.image}>
      <View style={style.container}>
        <Text style={style.heading}>What needs to be done</Text>
        <FlatList
          style={{ flex: 1 }}
          data={list}
          renderItem={({ item, index }) => (
            <Card
              data={item}
              index={index}
              setIsSelected={setIsSelected}
              deleteItem={deleteItem}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={style.textBoxWrapper}>
          <TextInput
            style={style.textInput}
            placeholder="Enter Task To Add"
            placeholderTextColor={COLORS.primary}
            onChangeText={(text) => setValue(text)}
            value={value}
          />
          <TouchableOpacity style={style.button} onPress={() => addText(value)}>
            <Text style={{ fontSize: 44, color: COLORS.secondary }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
