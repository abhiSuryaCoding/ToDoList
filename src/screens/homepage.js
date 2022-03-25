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
import { COLORS, FONTS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { backgroundImage, style } from "./homepage-style";

export default function Homepage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

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
            time: "Set Time",
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
  const onChange = (event, date) => {
    let currentDate = new Date(date);
    let time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    if (time !== "NaN:NaN:NaN") {
      list[index].time = time;
      removeData();
      saveData(list);
    }
    setShow(false);
  };

  function deleteItem(idx) {
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to Remove this Task?",
      [
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
      ]
    );
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
    removeData();
    saveData(data);
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
              setShow={setShow}
              setIndex={setIndex}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={style.textBoxWrapper}>
          {show && (
            <DateTimePicker
              mode={"time"}
              value={new Date()}
              onChange={onChange}
            ></DateTimePicker>
          )}

          <TextInput
            style={style.textInput}
            placeholder="Enter Task To Add"
            placeholderTextColor={COLORS.primary}
            onChangeText={(text) => setValue(text)}
            value={value}
          />
          <TouchableOpacity style={style.button} onPress={() => addText(value)}>
            <Text
              style={{
                fontSize: 45,
                color: COLORS.secondary,
                fontFamily: FONTS.h1_semiBold.fontFamily,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
