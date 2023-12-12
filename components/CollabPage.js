import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
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
    console.log(`Navigating to QuestionPage with question:`, question);
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

      // console.log("DATA IN COLLAB PAGE", question);

      if (data) {
        // 'data' is an array of objects with 'id' and 'course' columns
        const collabQuestionsArray = data.map((item) => ({
          uid: item.uid,
          course: item.course,
          question: item.question,
          created: item.created,
          author: item.author,
          num_collaborators: item.num_collaborators,
          num_huddle: item.num_huddle,
          expected_help: item.expected_help,
          collab_status: item.collab_status,
          question_id: item.question_id,
          device_id: deviceIdentifier,
          huddlers: item.huddlers,
        }));
        // console.log("test collabQuestions", data);

        setCollabQuestions(collabQuestionsArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        // Fetch or update data when the component comes into focus
        await getCollabQuestions();
        await getCourses();
      };

      fetchData(); // Call the fetchData function
    }, [])
  );

  useEffect(() => {
    getCollabQuestions();
    getCourses();
  }, [coursesArray]);

  const getCourses = async () => {
    try {
      const { data, error } = await supabase.from("sameQ-app-data").select("*");

      if (data) {
        // console.log("course data collab page: ", data);
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
    if (collabQuestions.length === 0) {
      return <Text style={styles.emptyChat}>Collaborate on a question!</Text>;
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
    // console.log("TESTING WHAT question is:", sortedQuestions);

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
        <View style={styles.collabTopRow}>
          <View style={styles.collabIcons}>
            <Icon name="clock" size={15 * scaleFactor} />
            <Text style={styles.queueTopRowText}>{question.help} </Text>

            <Icon name="people" size={15 * scaleFactor} />
            <Text style={styles.queueTopRowText}>{question.num_collab}</Text>
          </View>

          <Text style={styles.queueTopRowTextEnd}>{question.course}</Text>
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
      <ImageBackground
        style={styles.container}
        source={require("../assets/gradient.png")}
        resizeMode="cover"
      >
        <View style={styles.appBarHome}></View>
        <View style={styles.courseHeaderContainer}>
          <Text style={styles.pageHeader}>Collaborating</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center", paddingBottom: "20%" }}
          // PADDING BOTTOM ALLOWS FOR SCROLL TO SEE ALL ITEMS
        >
          {renderCollab()}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default CollabPage;
