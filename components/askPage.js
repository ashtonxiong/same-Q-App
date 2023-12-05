import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
// import "react-native-get-random-values";
import { supabase } from "../supabase";
import { useDeviceIdentifier } from "./deviceID";

const AskPage = ({ route }) => {
  const deviceIdentifier = useDeviceIdentifier();

  // TESTING SAVING QUESTION INFO
  const [questionInfo, setQuestionInfo] = useState({
    question: "",
    author: "",
    num_collaborators: 0,
    num_collaborators: 0,
    num_huddle: 0,
    expected_help: "",
    created: "",
    collab_status: "",
    device_id: "",
    course: "",
  });

  const addQuestion = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString("en-US", {
        month: "long",
      })} ${currentDate.getDate()}, ${currentDate.getFullYear()}, ${currentDate.toLocaleString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`;

      const { error } = await supabase.from("sameQ-app-questions").insert([
        {
          question: text,
          author: "You",
          num_collaborators: 1,
          num_huddle: 0,
          expected_help: "5:00 PM",
          created: formattedDate,
          collab_status: "TRUE",
          device_id: deviceIdentifier,
          course: selectedClass,
        },
      ]);

      // setQuestions(questionInfoArray);
      setText("");
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  // TESTING SAVING QUESTION INFO
  const { width, height } = Dimensions.get("window");
  const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCS147Checked, setIsCS147Checked] = useState(false);
  const [text, setText] = useState("");
  const [isLimitReachedModalVisible, setLimitReachedModalVisible] =
    useState(false);
  const characterLimit = 150;
  const navigation = useNavigation();

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleTextChange = (inputText) => {
    // Update the text and apply character limit
    if (inputText.length > characterLimit) {
      // Show the modal when the character limit is reached
      setLimitReachedModalVisible(true);
    } else {
      // Update the text state with the inputText
      setText(inputText);
    }
  };

  const handleCloseModal = () => {
    // Close the modal
    setLimitReachedModalVisible(false);
  };

  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([
    "Homework",
    "Lecture",
    "General",
    "Test",
    "Test1",
    "Tes2t",
    "Te3st",
  ]);
  const [classes, setClasses] = useState(["CS 147", "CS 161", "ENGLISH 9CE"]);
  const [selectedClass, setSelectedClass] = useState("");
  const handleClassPress = (selectedClass) => {
    setSelectedClass(selectedClass);
  };

  const renderClasses = () => {
    return classes.map((classItem) => (
      <TouchableOpacity
        key={classItem}
        onPress={() => handleClassPress(classItem)}
      >
        <View
          style={[
            styles.tagButton,
            selectedClass === classItem && styles.selectedTag, // Apply selectedTag style conditionally
          ]}
        >
          <Text
            style={[
              {
                color: selectedClass.includes(classItem) ? "white" : "black",
                fontSize: 14,
                fontWeight: 600,
              }, // Set text color conditionally
            ]}
          >
            {classItem}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

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

  const borderColor = text.length >= characterLimit ? "red" : "black";
  const errorMessage =
    text.length >= characterLimit ? (
      "Error: Character Limit has been reached"
    ) : (
      <Text>
        Character Limit: {text.length} / {characterLimit}{" "}
      </Text>
    );

  return (
    <View style={{ backgroundColor: "#DDCFFF", flex: 1 }}>
      {/* <TouchableHighlight onPress={Keyboard.dismiss} style={{}}> */}
      <View style={styles.container}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={clickMenuModal}>
            <View style={styles.backArrow}>
              <SimpleLineIcon name="menu" size={20} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.courseHeaderContainer}>
          <Text style={[styles.pageHeader]}>Create Question</Text>
        </View>

        <View style={styles.tagsContainer}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              margin: 10 * scaleFactor,
              paddingTop: 20 * scaleFactor,
            }}
          >
            <Text style={{ fontSize: 20 * scaleFactor }}>Select Class</Text>
            <View style={{ flexDirection: "row" }}>{renderClasses()}</View>
          </View>
          <View style={styles.tags}>
            <Text style={{ paddingRight: "5%", fontSize: 20 }}> Tags:</Text>
            {renderTags()}
          </View>
        </View>

        <View style={[styles.questionBoxContainer]}>
          <View style={[styles.questionInput, { borderColor: borderColor }]}>
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
                {errorMessage}
              </Text>
            </View>
            {/* ------ Private Question ----- */}
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
                }}
              >
                Make Question Private:
              </Text>
              {isChecked ? (
                <Icon name="check" size={18} color="green" />
              ) : (
                <Icon name="square-o" size={20} color="#5E42A6" />
              )}
            </TouchableOpacity>
            {/* ------ Private Question ----- */}
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
          <TouchableOpacity
            style={styles.submitQuestionButton}
            onPress={addQuestion}
            //----- NEED TO ADD NAVIGATING TO A CLASSES OFFICE HOURS
            //----- CREATE CLASSES DROPDOWN FOR WHICH QUESTION TO ASK
          >
            <Text style={{ fontSize: 30 }}>Submit</Text>
          </TouchableOpacity>
        </View>

        <Modal transparent={true} visible={isModalVisible}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.menuModalOverlay}>
              <TouchableWithoutFeedback onPress={() => addQuestion()}>
                <View style={styles.menuModalContent}>
                  <Text style={styles.menuModalTEXT}>TEST</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
      {/* </TouchableHighlight> */}
    </View>
  );
};

export default AskPage;
