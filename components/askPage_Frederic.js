import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { supabase } from "../supabase";
import { useDeviceIdentifier } from "./deviceID";

const AskPage = ({ route }) => {
  const deviceIdentifier = useDeviceIdentifier();
  const { width, height } = Dimensions.get("window");
  const scaleFactor = Math.min(width, height) / 375; // Adjusted 375 based on our design reference width
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCS147Checked, setIsCS147Checked] = useState(false);
  const [text, setText] = useState("");
  const [isQuestion, setIsQuestion] = useState(true);
  const [isLimitReachedModalVisible, setLimitReachedModalVisible] =
    useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState(["Homework", "Lecture", "General"]);
  const [classes, setClasses] = useState(["CS 147", "CS 161", "ENGLISH 9CE"]);
  const [selectedClass, setSelectedClass] = useState("");
  const [isClassSelected, setIsClassSelected] = useState(true);

  const [submitPressed, setSubmitPressed] = useState(false);

  // -------- SEND QUESTION TO DATABASE ------
  const [classObject, setClassObject] = useState({
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
    question_id: "",
    huddlers: "",
  });

  const addQuestion = async () => {
    setSubmitPressed(true);
    try {
      if (selectedClass === "") {
        setIsClassSelected(false);
        return;
      }
      if (text.length === 0) {
        setIsQuestion(false);
        return;
      }
      // setIsQuestion(false);

      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString("en-US", {
        month: "long",
      })} ${currentDate.getDate()}, ${currentDate.getFullYear()}, ${currentDate.toLocaleString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`;
      const num = Math.floor(Math.random() * 900) + 100;

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
          question_id: `${num}`,
          huddlers: "You",
        },
      ]);

      // adds to collab page
      const { error2 } = await supabase.from("sameQ-app-collab").insert([
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
          question_id: `${num}`,
          huddlers: "You",
        },
      ]);

      const info = {
        question: text,
        author: "You",
        num_collaborators: 1,
        num_huddle: 0,
        expected_help: "5:00 PM",
        created: formattedDate,
        collab_status: "TRUE",
        device_id: deviceIdentifier,
        course: selectedClass,
        question_id: `${num}`,
        huddlers: "You",
      };
      setClassObject(info);

      // setQuestions(questionInfoArray);
      openSubmission();
      setText("");
      setSelectedClass("");
      setSelectedTags([]);

      setIsClassSelected(true);
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };
  // -------- SEND QUESTION TO DATABASE ------

  useEffect(() => {
    console.log("Updated CLASS OBJECT", classObject);
  }, [classObject]);

  const characterLimit = 150;
  const navigation = useNavigation();

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleTextChange = (inputText) => {
    if (submitPressed) {
      setSubmitPressed(false);
    }
    // Update the text and apply character limit
    if (inputText.length > characterLimit) {
      // Show the modal when the character limit is reached
      setLimitReachedModalVisible(true);
    } else {
      setText(inputText);
      if (inputText.length > 0) {
        setIsQuestion(true);
      }
      if (inputText.length === 0 && isQuestion) {
        setIsQuestion(true);
      } else {
        setIsCS147Checked(false);
      }
    }
  };

  const handleClassPress = (selectedClassItem) => {
    if (selectedClass === selectedClassItem) {
      // If the clicked class is already selected, unselect it
      setSelectedClass("");
      setIsClassSelected(false);
    } else {
      // If a different class is clicked or no class is currently selected, select the clicked class
      setSelectedClass(selectedClassItem);
      setIsClassSelected(true);
    }
  };

  const clickMenuModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const [isSubmissionVisible, setIsSubmissionVisible] = useState(false);

  const openSubmission = () => {
    setIsSubmissionVisible(!isSubmissionVisible);
  };
  const closeSubmission = () => {
    setIsSubmissionVisible(false);
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

  const handleSimilarQuestions = (
    course,
    question,
    deviceIdentifier,
    prevPage
  ) => {
    closeSubmission();
    console.log(`Navigating to Similar with question:`, question);
    navigation.navigate("Similar", {
      question,
      question,
      deviceIdentifier,
      prevPage,
    });
  };

  const handleViewQuestion = (course, question, deviceIdentifier, prevPage) => {
    closeSubmission();
    console.log(`Navigating to QuestionPage with question: ${question}`);
    navigation.navigate("QuestionPage", {
      course,
      question,
      deviceIdentifier,
      prevPage,
    });
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
                color: selectedClass.includes(classItem) ? "black" : "white",
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
                color: selectedTags.includes(tag) ? "black" : "white",
                fontSize: 14,
                fontWeight: 600,
                // color: 'white'
              }, // Set text color conditionally
            ]}
          >
            {tag}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  // const borderColor = text.length >= characterLimit ? "red" : "black";
  const borderColor =
    text.length >= characterLimit || isQuestion === false ? "red" : "black";

  const errorMessage =
    submitPressed && text.length === 0 ? (
      <Text style={{ color: "red" }}>Error: Please Type a Question</Text>
    ) : text.length >= characterLimit ? (
      <Text style={{ color: "red" }}>
        Error: Character Limit has been reached
      </Text>
    ) : (
      <Text style={{ color: "white" }}>
        Character Limit: {text.length} / {characterLimit}
      </Text>
    );

  // const noClassSelected = () => {
  //   return isClassSelected === false ? (
  //     <Text style={{ color: "red", fontSize: 20 * scaleFactor }}>
  //       Please select a class.
  //     </Text>
  //   ) : (
  //     <Text></Text>
  //   );
  // };

  const noClassSelected = () => {
    return !isClassSelected ? (
      <Text style={{ color: "red", fontSize: 20 * scaleFactor }}>
        Error: Please Select a Class
      </Text>
    ) : (
      <Text style={{ fontSize: 20 * scaleFactor, color: "white" }}>
        Select Class
      </Text>
    );
  };

  const noQuestion = () => {
    return !isQuestion ? <Text></Text> : <Text></Text>;
  };

  const handleEnterPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.askContainer}>
        <ImageBackground
          style={styles.container}
          source={require("../assets/gradient.png")}
          resizeMode="cover"
        >
          {/* <TouchableHighlight onPress={Keyboard.dismiss} style={{}}> */}
          <View style={styles.askContainer}>
            {/* <ImageBackground style={styles.container} source={require('../assets/gradient.png')} resizeMode="cover"> */}
            <View style={styles.appBarQuestion}>
              {/* <TouchableOpacity onPress={clickMenuModal}>
            <View style={styles.backArrow}>
              <SimpleLineIcon name="menu" size={20} color="#000" />
            </View>
          </TouchableOpacity> */}
            </View>
            <View style={styles.courseHeaderContainer}>
              <Text style={[styles.pageHeader]}>Create Question</Text>
            </View>

            <View style={styles.tagsContainer}>
              {/* <View
            style={{
              // borderWidth: 2,
              alignItems: "center",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {noClassSelected()}
          </View> */}

              {/* <View
            style={{
              // borderWidth: 2,
              width: "100%",
              alignItems: "flex-start",
              // margin: 5 * scaleFactor,
              paddingTop: 10 * scaleFactor,
              paddingBottom: 10 * scaleFactor,
            }}
          >
            <Text style={{ fontSize: 20 * scaleFactor, color: "white" }}>
              Select Class
            </Text>
          </View> */}

              <View
                style={{
                  // borderWidth: 2,
                  width: "100%",
                  alignItems: "flex-start",
                  // margin: 5 * scaleFactor,
                  paddingTop: 10 * scaleFactor,
                  paddingBottom: 10 * scaleFactor,
                }}
              >
                {noClassSelected()}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                {renderClasses()}
              </View>

              <View
                style={{
                  // borderWidth: 2,
                  width: "100%",
                  alignItems: "flex-start",
                  // margin: 5 * scaleFactor,
                  paddingTop: 10 * scaleFactor,
                  paddingBottom: 10 * scaleFactor,
                }}
              >
                <Text style={{ fontSize: 20 * scaleFactor, color: "white" }}>
                  Select Tag
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                {renderTags()}
              </View>

              {/* <View style={[styles.tags]}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              {" "}
              Tags:
            </Text>
            {renderTags()}
          </View>
        </View> */}
            </View>

            <View style={[styles.questionBoxContainer]}>
              <View style={[styles.questionInput, { borderColor: "white" }]}>
                <TextInput
                  multiline={true}
                  style={{
                    // Remove height property
                    borderRadius: 40,
                    marginTop: 10,
                    padding: 20,
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    maxWidth: "100%",
                    alignItems: "flex-start",
                    marginBottom: 0,
                    color: "white",
                    textAlignVertical: "top", // Set textAlignVertical to "top"
                    color: "#5E42A6",
                  }}
                  placeholder="Press to start typing…"
                  placeholderTextColor={"#5E42A6"}
                  value={text}
                  onChangeText={handleTextChange}
                  onSubmitEditing={() => Keyboard.dismiss()}
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
                      fontSize: 16,
                      marginRight: "2%",
                      color: "white",
                    }}
                  >
                    Make Question Private:
                  </Text>
                  {isChecked ? (
                    <Icon name="check" size={18} color="white" />
                  ) : (
                    <Icon name="square-o" size={20} color="white" />
                  )}
                </TouchableOpacity>
                {/* ------ Private Question ----- */}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                paddingBottom: "7%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingBottom: "5%",
                }}
              >
                {noQuestion()}
              </View>
              <TouchableOpacity
                style={styles.submitQuestionButton}
                onPress={addQuestion}
                //----- NEED TO ADD NAVIGATING TO A CLASSES OFFICE HOURS
                //----- CREATE CLASSES DROPDOWN FOR WHICH QUESTION TO ASK
              >
                <Text style={styles.submitQuestionButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>

            <Modal transparent={true} visible={isSubmissionVisible}>
              <TouchableWithoutFeedback onPress={closeSubmission}>
                <View style={styles.submissionModal}>
                  {/* <View
                  style={[
                    styles.submissionModalContent,
                    { flexDirection: "column" },
                  ]}
                > */}
                  <View style={styles.submissionModalContent}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50%",
                      }}
                    >
                      <Text style={{ fontSize: 20 * scaleFactor }}>
                        Question added to Queue
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingBottom: "5%",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                      }}
                      onPress={() =>
                        handleViewQuestion(
                          classObject,
                          classObject,
                          deviceIdentifier,
                          "CollabPage"
                        )
                      }
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          paddingHorizontal: "5%",
                          paddingVertical: "1%",
                          borderRadius: 10,
                          backgroundColor: "#5E42A6",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 15 * scaleFactor,
                          }}
                        >
                          Go To Your Question
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/* Added button for viewing similar questions */}
                    <TouchableOpacity
                      style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: "10%",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                      }}
                      onPress={() =>
                        handleSimilarQuestions(
                          classObject,
                          classObject,
                          deviceIdentifier,
                          "SimilarQuestions"
                        )
                      }
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          paddingHorizontal: "5%",
                          paddingVertical: "1%",
                          borderRadius: 10,
                          backgroundColor: "#5E42A6",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 15 * scaleFactor,
                          }}
                        >
                          See Similar Questions in Queue
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            {/* </ImageBackground> */}
          </View>
          {/* </TouchableHighlight> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AskPage;
