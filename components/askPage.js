import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabase";
import { useDeviceIdentifier } from "./deviceID";
// import { TextInput } from "react-native-gesture-handler";

const AskPage = () => {
  const { width, height } = Dimensions.get("window");
  const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [text, setText] = useState("");

  const characterLimit = 250;

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleTextChange = (inputText) => {
    // Update the text and apply character limit
    setText(inputText);
  };

  const [tags, setTags] = useState([
    "Homework",
    "Lecture",
    "General",
    "Test",
    "Test1",
    "Tes2t",
    "Te3st",
  ]);
  const [editable, setEditable] = useState(false);

  const clickMenuModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTagPress = (tag) => {
    // Check if the tag is already selected
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      // Tag is not selected, add it to the selected tags
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderTags = () => {
    return tags.map((tag) => (
      <TouchableOpacity key={tag} onPress={() => handleTagPress(tag)}>
        <View
          style={[
            styles.tagButton,
            selectedTags.includes(tag) && styles.selectedTag, // Apply selectedTag style conditionally
          ]}
        >
          <Text
            style={[
              {
                color: selectedTags.includes(tag) ? "white" : "black",
                fontSize: 14,
                fontWeight: 600,
              }, // Set text color conditionally
            ]}
          >
            {tag}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={clickMenuModal}>
            <View style={styles.backArrow}>
              <SimpleLineIcon name="menu" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.courseHeaderContainer}>
          <Text
            style={[
              styles.pageHeader,
              // { borderColor: "green", borderWidth: 2 },
            ]}
          >
            Create Question
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          <View style={styles.tags}>
            <Text style={{ paddingRight: "5%", fontSize: 20 }}> Tags:</Text>
            {renderTags()}
          </View>
        </View>

        <View style={styles.questionBoxContainer}>
          <View style={styles.questionInput}>
            <TextInput
              multiline
              style={{
                height: "100%",
                marginTop: "2%",
                borderRadius: 40,
                padding: 20,
                justifyContent: "flex-start",
                flexWrap: "wrap",
                maxWidth: "100%",
                marginBottom: 0,
              }}
              placeholder="Press to start typing…"
              placeholderTextColor={"black"}
              value={text}
              onChangeText={handleTextChange} // Use onChangeText instead of onChange
            />
          </View>
          <View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15 * scaleFactor, marginTop: "5%" }}>
                Character Limit: {text.length}/250
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              onPress={handleCheckboxToggle}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  marginRight: "5%",
                  // marginLeft: "auto",
                }}
              >
                Make Question Private:
              </Text>
              {isChecked ? (
                <Icon
                  name="check"
                  size={18}
                  color="green"
                  // style={{ marginLeft: 20 }}
                />
              ) : (
                <Icon
                  name="square-o"
                  size={20}
                  color="#5E42A6"
                  // style={{ marginLeft: 20 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: "7%",
          }}
        >
          <TouchableOpacity style={styles.submitQuestionButton}>
            <Text style={{ fontSize: 30 }}>Submit</Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={isModalVisible}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.menuModalOverlay}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.menuModalContent}>
                  <Text style={styles.menuModalTEXT}>TEST</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AskPage;
