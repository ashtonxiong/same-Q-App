import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
// import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { supabase } from "../supabase";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const { parse, getTime } = require("date-fns");
import { useDeviceIdentifier } from "./deviceID";

const CollabPage = () => {
  const navigation = useNavigation();
  const [collabQuestions, setCollabQuestions] = useState([]);
  const [coursesArray, setCourses] = useState([]);
  const isFocused = useIsFocused();

  const deviceIdentifier = useDeviceIdentifier();

  const handleQuestionPress = (
    course,
    question,
    deviceIdentifier,
    prevPage
  ) => {
    console.log(
      `Navigating to QuestionPage with question: ${question.question}`
    );
    navigation.navigate("QuestionPage", {
      course,
      question,
      deviceIdentifier,
      prevPage,
    });
  };

  const getCollabQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-app-collab")
        .select("*")
        // .eq("collab_status", "TRUE")
        .eq("device_id", deviceIdentifier);

      if (data) {
        // 'data' is an array of objects with 'id' and 'course' columns
        const collabQuestionsArray = data.map((item) => ({
          uid: item.uid,
          course: item.course,
          question: item.question,
          created: item.created,
          author: item.author,
          num_collab: item.num_collaborators,
          num_huddle: item.num_huddle,
          help: item.expected_help,
          collab_status: item.collab_status,
          // question_id: item.question_id,
          device_id: deviceIdentifier,
        }));
        console.log("test collabQuestions", collabQuestionsArray);

        setCollabQuestions(collabQuestionsArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  useFocusEffect(() => {
    // Fetch or update data when the component comes into focus
    getCollabQuestions();
  });

  useEffect(() => {}, [coursesArray]);

  const getCourses = async () => {
    try {
      const { data, error } = await supabase.from("sameQ-app-data").select("*");

      if (data) {
        // 'data' is an array of objects with 'id' and 'course' columns
        const courses = data.map((item) => ({
          id: item.id,
          course: item.course,
          instructor: item.instructor,
          duration: item.duration,
          num_active_students: item.num_active_students,
          num_questions: item.num_questions,
          status: item.status,
        }));
        setCourses(courses);
        // console.log("course data collab page: ", coursesArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  useEffect(() => {
    getCourses();
    getCollabQuestions();
  }, [isFocused]);

  const { width, height } = Dimensions.get("window");
  const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

  const renderCollab = () => {
    // console.log('Collab questions:', collabQuestions);
    if (collabQuestions.length === 0) {
      return (
        <Text style={styles.emptyChat}>Collaborate on a question!</Text>
        // <Text>Device id: {deviceIdentifier}</Text>
      );
    }

    const sortedQuestions = [...collabQuestions].sort((a, b) => {
      const dateStringA = a.created;
      const dateStringB = b.created;
      const parsedDataA = parse(
        dateStringA,
        "MMMM d, yyyy, h:mm a",
        new Date()
      );
      const parsedDataB = parse(
        dateStringB,
        "MMMM d, yyyy, h:mm a",
        new Date()
      );
      const timeA = getTime(parsedDataA);
      const timeB = getTime(parsedDataB);
      return timeA - timeB;
    });

    return sortedQuestions.map((question) => (
      <TouchableOpacity
        key={question.uid}
        style={styles.collabBox}
        onPress={() =>
          handleQuestionPress(
            coursesArray,
            question,
            deviceIdentifier,
            "CollabPage"
          )
        }
      >
        {/* top row */}
        <Text>{question.course}</Text>
        <View style={styles.collabTopRow}>
          <View style={styles.collabPeopleIcon}>
            <Text style={{ fontSize: 17 * scaleFactor, fontWeight: "bold" }}>
              {question.num_collab}
            </Text>
            <Icon name="people" size={20 * scaleFactor} />
          </View>
          <Text
            style={{
              fontSize: 20 + scaleFactor,
              marginLeft: 5 * scaleFactor,
              marginRight: 5 * scaleFactor,
            }}
          >
            Expected Help at{" "}
            <Text style={{ fontWeight: "bold" }}>{question.help}</Text>
          </Text>
          <View style={styles.collabEarphone}>
            <Icon name="earphones" size={20 * scaleFactor} />
            <Text
              style={{
                fontSize: 20 * scaleFactor,
                fontWeight: "bold",
                marginLeft: 3,
              }}
            >
              {question.num_huddle}
            </Text>
          </View>
        </View>

        {/* middle row */}
        <View style={styles.collabMid}>
          <Text style={{ fontSize: 17 * scaleFactor, color: "#000000" }}>
            {question.question}
          </Text>
        </View>

        {/* bottom row */}
        <View style={styles.collabBot}>
          {/* <TouchableOpacity
        style={styles.collabButton}
        onPress={() => handleJoinPress("CS 147")}
      >
        <Text style={styles.collabButtonText}> Collaborating </Text>
      </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.collabContainer}>
      {/* <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: '20%'}} 
        // PADDING BOTTOM ALLOWS FOR SCROLL TO SEE ALL ITEMS
        >         */}
      <View style={styles.collabHeader}>
        <Text style={styles.courseBoxTEXT}> Collaborating </Text>
        <Text> Collaborating on {collabQuestions.length} questions</Text>
      </View>

      <Text>Device identifier: {deviceIdentifier}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", paddingBottom: "20%" }}
        // PADDING BOTTOM ALLOWS FOR SCROLL TO SEE ALL ITEMS
      >
        {renderCollab()}
      </ScrollView>
    </View>
  );
};

export default CollabPage;
