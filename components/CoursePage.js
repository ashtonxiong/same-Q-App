import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { supabase } from "../supabase";
import { de } from "date-fns/locale";
import FAIcon from "react-native-vector-icons/FontAwesome5";

const CoursePage = ({ route }) => {
  const { course, deviceIdentifier } = route.params;
  const courseName = course.course;

  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

  const [questions, setQuestions] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);

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

  const getQuestions = async () => {
    // console.log("device id in getQuestions:", deviceIdentifier);
    try {
      // sortedQuestionsArray([]);
      const { data, error } = await supabase
        .from("sameQ-app-questions")
        .select("*")
        .eq("course", courseName)
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
        .eq("course", courseName)
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

        setDefaultQuestions(questionInfoArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  useEffect(() => {
    getDefaultQuestions();
    getQuestions();
  }, []);

  const handleCollabPress = (course, question, deviceIdentifier, prevPage) => {
    navigation.navigate("QuestionPage", {
      course,
      question,
      deviceIdentifier,
      prevPage,
    });
  };

  const deleteCollab = async (course, question) => {
    console.log("delete collab pressed");
    try {
      const { old, error1 } = await supabase
        .from("sameQ-app-collab")
        .select("*")
        .eq("question_id", question.question_id)
        .eq("question", question.question);
      console.log("TEST DATA EXIST", question);

      const { error } = await supabase
        .from("sameQ-app-collab")
        .delete([
          {
            collab_status: "FALSE",
            num_collaborators: question.num_collab,
            device_id: "000",
          },
        ])
        .eq("device_id", deviceIdentifier)
        .eq("question_id", question.question_id);
      // .eq("question", question.question);

      // setNumCollaborators(
      //   (prevActualNumCollaborators) => prevActualNumCollaborators - 1
      // );

      // if (error) {
      //   throw new Error(error.message);
      // }
    } catch (error) {
      console.error("Error deleting data from Supabase:", error.message);
    }
  };

  const handleBackHome = (home) => {
    navigation.navigate("HomePage");
  };

  // func to parse "HH:MM a" formatted help times
  const parseTime = (timeString) => {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    const hours24 = period === "PM" ? hours + 12 : hours;
    return [hours24, minutes];
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
                <View style={styles.questionNumsBlock}>
                  <View style={styles.iconBlock}>
                    <FAIcon name="clock" size={20 * scaleFactor} style={styles.questionIcon}/>
                    <Text style={styles.expectedText}>{question.expected_help}  </Text>
                  </View>
                </View>

                <View style={styles.questionNumsBlock}>
                <View style={styles.iconBlock}>
                    <FAIcon name="user" size={20 * scaleFactor} style={styles.questionIcon}/>
                    <Text
                      style={styles.expectedText}>
                       {question.num_collaborators}
                    </Text>
                  </View>
                  {/* <View style={styles.iconBlock}>
                    <FAIcon name="volume-up" size={20 * scaleFactor} style={styles.questionIcon}/>
                    <Text style={styles.expectedText}>
                      {time.earphone}  </Text>
                    <FAIcon name="comments" size={20 * scaleFactor} style={styles.questionIcon}/>
                    <Text style={styles.expectedText}>
                      {time.earphone}</Text>
                  </View> */}
                </View>
              </View>

              {/* middle row */}
              <View style={styles.queueMid}>
                <Text style={{ fontSize: 20, color: "#000000" }}>
                  {question.question}
                </Text>
              </View>

              {/* bottom row */}
              <View style={styles.queueBot}>
          {question.collab_status ? ( // check if you are collaborating
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteCollab(
                course,
                question
              )}
            >
              <Text style={styles.buttonText}> Leave Question </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleCollabPress(
                course,
                question,
                deviceIdentifier,
                "CoursePage"
              )}
            >
              <Text style={styles.buttonText}> View </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      // <View key={question.uid} style={styles.queueBox}>
      //   {/* top row */}
      //   <View style={styles.queueTopRow}>
      //     {/* <View style={styles.queueMiniBox}>

      //   </View> */}
      //     <Icon name="clock" size={15 * scaleFactor} />
      //     <Text style={styles.queueTopRowText}>{question.expected_help} </Text>

      //     <Icon name="people" size={15 * scaleFactor} />
      //     <Text style={styles.queueTopRowText}>{question.num_collab}</Text>
      //   </View>

      //   {/* middle row */}
      //   <View style={styles.queueMid}>
      //     <Text style={{ fontSize: 17 * scaleFactor, color: "#000000" }}>
      //       {question.question}
      //     </Text>
      //   </View>

      //   {/* bottom row */}
      //   <View style={styles.queueBot}>
      //     <TouchableOpacity
      //       style={styles.queueButton}
      //       onPress={() =>
      //         handleCollabPress(
      //           course,
      //           question,
      //           deviceIdentifier,
      //           "CoursePage"
      //         )
      //       }
      //     >
      //       <Text style={styles.queueButtonText}> View </Text>
      //     </TouchableOpacity>
      //   </View>
      // </View>
    ));
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.appBar}>
        <Text style={styles.pageHeader}>{course.course}</Text>
        <Text style={{ color: 'white', alignSelf: 'center' }}>{course.duration} • {course.instructor}</Text>

      </View>
      <TouchableOpacity style={styles.backArrowSeamus} onPress={handleBackHome}>
        <View >
          <Icon name="arrow-left" size={20} color="white" />
        </View>
      </TouchableOpacity>
      {/* <Text>Device identifier: {deviceIdentifier}</Text> */}
      {/* <View style={styles.appBar}>
        <TouchableOpacity onPress={handleBackHome}>
          <View style={styles.backArrow}>
            <Icon name="arrow-left" size={20} color="white" />
            <Text style={styles.backTEXT}>Home</Text>
          </View>
        </TouchableOpacity>
      </View>


     <View>
       <View style={styles.classInfo}>
         <View style={styles.courseHeaderContainer}>
           <Text style={styles.pageHeader2}>{course.course}</Text>
         </View>


         <View style={styles.courseDetails}>
           <View style={styles.courseDetailTop}>
             <View style={{ flexDirection: "row" }}>
               <Text style={{ fontWeight: "bold" }}>Instructor: </Text>
               <Text> {course.instructor} </Text>
             </View>
             <Text style={{ marginLeft: "auto" }}> 5 Questions in Queue</Text>
           </View>
           <View style={styles.courseDetailBottom}>
             <View style={{ flexDirection: "row" }}>
               <Text style={{ fontWeight: "bold" }}>Duration: </Text>
               <Text> {course.duration} </Text>
             </View>
             <Text style={{ marginLeft: "auto" }}> 20 Active </Text>
           </View>
         </View>
         <View
           style={{
             alignItems: "center",
             flexDirection: "row",
            //  justifyContent: "flex-end",
           }}
         >
           <Text
             style={styles.sectionHeader2}>Queue</Text>
         </View>
         {/* <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
           <TouchableOpacity style={{ justifyContent: "flex-end" }}>
             <FontIcon
               name="filter"
               size={40}
               style={{ marginTop: -110 * scaleFactor }}
             ></FontIcon>
           </TouchableOpacity>
         </View>
       </View> */}


      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: "65%" },
        ]}
      >
        {renderQuestions()}
      </ScrollView>
    </View>
  );
};

export default CoursePage;
