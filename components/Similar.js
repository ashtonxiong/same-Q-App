import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
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

const Similar = ({ route }) => {
  const deviceIdentifier = useDeviceIdentifier();
  const [questions, setQuestions] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);
  const question = route.params.question;
  const { width, height } = Dimensions.get("window");
  const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

  const navigation = useNavigation();

  const handleBackAsk = (ask) => {
    navigation.navigate("AskPage");
  };

  const getQuestions = async () => {
    try {
      // sortedQuestionsArray([]);
      const { data, error } = await supabase
        .from("sameQ-app-questions")
        .select("*")
        .eq("course", question.course)
        .eq("device_id", deviceIdentifier);

      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        // 'data' is an array of objects with 'id' and 'course' columns
        const questionInfoArray = data.map((item) => ({
          uid: item.uid,
          course: item.course,
          question: item.question,
          created: item.created,
          author: item.author,
          num_collaborators: item.num_collaborators,
          num_huddle: item.num_huddle,
          chats: item.chats,
          huddlers: item.huddlers,
          expected_help: item.expected_help,
          question_id: item.question_id,
        }));
        console.log("Made Chats", questionInfoArray);
        setQuestions(questionInfoArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const getDefaultQuestions = async () => {
    // console.log("device id in getQuestions:", deviceIdentifier);
    try {
      const { data, error } = await supabase
        .from("sameQ-app-questions")
        .select("*")
        .eq("course", question.course)
        .eq("device_id", "000");

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        // 'data' is an array of objects with 'id' and 'course' columns
        const questionInfoArray = data.map((item) => ({
          uid: item.uid,
          course: item.course,
          question: item.question,
          created: item.created,
          author: item.author,
          num_collaborators: item.num_collaborators,
          num_huddle: item.num_huddle,
          huddlers: item.huddlers,
          chats: item.chats,
          expected_help: item.expected_help,
          question_id: item.question_id,
        }));
        // console.log("in getQuestions 3", questionInfoArray);
        console.log("Default Qs", questionInfoArray);
        setDefaultQuestions(questionInfoArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const parseTime = (timeString) => {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const hours24 = period === "PM" ? hours + 12 : hours;
    return [hours24, minutes];
  };
  const handleCollabPress = (course, question, deviceIdentifier, prevPage) => {
    navigation.navigate("QuestionPage", {
      course,
      question,
      deviceIdentifier,
      prevPage,
    });
  };
  const renderQuestions = () => {
    if (questions.length === 0 && defaultQuestions.length === 0) {
      return (
        <Text style={styles.emptyChat}>
          Be the first one to ask a question!
        </Text>
      );
    }

    const combinedQuestions = [...questions, ...defaultQuestions];
    // sort the questions based on expected help time
    const sortedQuestionsArray = [...combinedQuestions].sort((a, b) => {
      const timeA = new Date(2000, 0, 1, ...parseTime(a.expected_help));
      const timeB = new Date(2000, 0, 1, ...parseTime(b.expected_help));
      return timeA - timeB;
    });

    // console.log("SORTED QUESTIONS ARRAY", sortedQuestionsArray);

    return sortedQuestionsArray.map((question) => (
      <View key={question.uid} style={styles.queueBox}>
        {/* top row */}
        <View style={styles.queueTopRow}>
          {/* <View style={styles.queueMiniBox}>

        </View> */}
          <Icon name="clock" size={15 * scaleFactor} />
          <Text style={styles.queueTopRowText}>{question.expected_help} </Text>

          <Icon name="people" size={15 * scaleFactor} />
          <Text style={styles.queueTopRowText}>{question.num_collab}</Text>
        </View>

        {/* middle row */}
        <View style={styles.queueMid}>
          <Text style={{ fontSize: 17 * scaleFactor, color: "#000000" }}>
            {question.question}
          </Text>
        </View>

        {/* bottom row */}
        <View style={styles.queueBot}>
          <TouchableOpacity
            style={styles.queueButton}
            onPress={() =>
              handleCollabPress(
                question,
                question,
                deviceIdentifier,
                "CoursePage"
              )
            }
          >
            <Text style={styles.queueButtonText}> View </Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        // Fetch or update data when the component comes into focus
        await getQuestions();
        await getDefaultQuestions();
      };

      fetchData();
    }, [])
  );

  return (
    <View style={styles.collabContainer}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={handleBackAsk}>
          <View style={styles.backArrow}>
            <Icon name="arrow-left" size={20} color="#000" />
            <Text style={styles.backTEXT}>Ask</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.courseHeaderContainer}>
        <Text style={styles.pageHeader}>Similar Questions</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", paddingBottom: "20%" }}
        // PADDING BOTTOM ALLOWS FOR SCROLL TO SEE ALL ITEMS
      >
        {renderQuestions()}
      </ScrollView>
    </View>
  );
};

export default Similar;
