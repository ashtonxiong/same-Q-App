import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { supabase } from "../supabase";
const { parse, getTime } = require("date-fns");

const QuestionPage = ({ route }) => {
  const { question, course, deviceIdentifier } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(0);

  const questionText = question.question;
  const courseName = course.course;
  const [chatsArray, setChatsArray] = useState([]);
  const [defaultChatsArray, setDefaultChatsArray] = useState([]);
  const [message, setText] = useState("");
  const messagesRef = useRef(null);
  const isFocused = useIsFocused();

  const [collabStatus, setCollabStatus] = useState(["Collaborate"]);

  const getChats = async () => {
    try {
      console.log(
        "fetching data for device:",
        deviceIdentifier,
        "for question:",
        question.question,
        "for course:",
        course.course
      );
      const { data, error } = await supabase
        .from("sameQ-chats")
        .select("*")
        .eq("course", course.course)
        .eq("question", question.question)
        // .eq('device_id', '000');
        .eq("device_id", deviceIdentifier);
      // .or('device_id.eq.000, device_id.eq.', deviceIdentifier);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        const newChats = data.map((item) => ({
          uid: item.uid,
          sender: item.sender,
          senderInitials: item.sender_initials,
          message: item.message,
          timeSent: item.time,
        }));

        setChatsArray(newChats);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const getDefaultChats = async () => {
    try {
      console.log(
        "fetching data for device:",
        deviceIdentifier,
        "for question:",
        question.question,
        "for course:",
        course.course
      );
      const { data, error } = await supabase
        .from("sameQ-chats")
        .select("*")
        .eq("course", course.course)
        .eq("question", question.question)
        .eq("device_id", "000");
      // .eq('device_id', deviceIdentifier);
      // .or('device_id.eq.000, device_id.eq.', deviceIdentifier);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        const newChats = data.map((item) => ({
          uid: item.uid,
          sender: item.sender,
          senderInitials: item.sender_initials,
          message: item.message,
          timeSent: item.time,
        }));

        setDefaultChatsArray(newChats);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const addMessage = async (course, question, message) => {
    try {
      console.log("Course to add message to:", course.course);
      console.log("Question to add message to:", question.question);
      console.log("New message to send:", message);

      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString("en-US", {
        month: "long",
      })} ${currentDate.getDate()}, ${currentDate.getFullYear()}, ${currentDate.toLocaleString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`;

      const { error } = await supabase.from("sameQ-chats").insert([
        {
          course: course.course,
          question: question.question,
          sender: "You",
          message: message,
          time: formattedDate,
          device_id: deviceIdentifier,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      setChatsArray((prevChatsArray) => [
        ...prevChatsArray,
        {
          sender: "You",
          message: message,
          timeSent: formattedDate,
          senderInitials: null,
        },
      ]);
    } catch (error) {
      console.error("Error adding data into Supabase:", error.message);
    }
  };

  const addCollab = async (course, question) => {
    try {
      console.log("device in in addCollab", deviceIdentifier);
      console.log("course to add:", course.course);
      console.log("question to add:", question.question);
      const { error } = await supabase.from("sameQ-app-questions").upsert([
        {
          course: course.course,
          question: question.question,
          author: question.author,
          num_collaborators: question.num_collab,
          num_huddle: question.num_huddle,
          created: question.created,
          expected_help: question.expected_help,
          collab_status: "TRUE",
          device_id: deviceIdentifier,
        },
      ]);
      // .eq('uid', question.uid);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error adding data into Supabase:", error.message);
    }
  };

  const deleteCollab = async (course, question) => {
    try {
      console.log("course to delete:", course.course);
      console.log("question to delete:", question.question);
      const { error } = await supabase
        .from("sameQ-app-questions")
        .update([{ collab_status: "FALSE" }])
        .eq("device_id", deviceIdentifier)
        .eq("course", course.course)
        .eq("question", question.question);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error deleting data from Supabase:", error.message);
    }
  };

  const getCollabStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-app-questions")
        .select("collab_status")
        .eq("question", question.question)
        .eq("device_id", deviceIdentifier);

      if (data && data.length > 0) {
        setCollabStatus([
          data[0].collab_status ? "Uncollaborate" : "Collaborate",
        ]);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  useEffect(() => {
    getDefaultChats();
    getChats();
    getCollabStatus();
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getDefaultChats();
      getChats();
      getCollabStatus();
    }
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      getDefaultChats();
      getChats();
      getCollabStatus(); // fetch the collaboration status when navigating back into modal
    }, [])
  );

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollToEnd({ animated: true });
    }
  }, [chatsArray]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setBottomMargin(Platform.OS === "ios" ? 0 : 0); // make keyboard and input box smooth
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setBottomMargin(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigation = useNavigation();

  const renderMessages = () => {
    if (defaultChatsArray.length === 0 && chatsArray.length === 0) {
      return (
        <Text style={styles.emptyChat}>
          Be the first one to send a message!
        </Text>
      );
    }

    // sort default chats based on date/time sent
    const sortedChatsArray = [...defaultChatsArray].sort((a, b) => {
      const dateStringA = a.timeSent;
      const dateStringB = b.timeSent;
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

    // combine default and new chats
    const combinedChats = [...sortedChatsArray, ...chatsArray];

    return combinedChats.map((chat) => {
      if (chat.sender !== "You") {
        return (
          <View key={chat.timeSent} style={styles.messageAndTimeContainer}>
            <View style={[styles.grayTextMessageContainer]}>
              <Text style={styles.grayMessageInitials}>
                {chat.senderInitials}
              </Text>
              <View style={styles.grayMessage}>
                <Text>{chat.message}</Text>
              </View>
            </View>
            <Text style={styles.grayTextMessageTime}>{chat.timeSent}</Text>
          </View>
        );
      } else {
        return (
          <View key={chat.timeSent} style={styles.messageAndTimeContainer}>
            <View style={[styles.purpleTextMessageContainer]}>
              <View style={styles.purpleMessage}>
                <Text style={styles.purpleMessageText}>{chat.message}</Text>
              </View>
            </View>
            <Text style={styles.purpleTextMessageTime}>{chat.timeSent}</Text>
          </View>
        );
      }
    });
  };

  const handleCollabUncollabPress = (course, question) => {
    setCollabStatus((prevStatus) => {
      // toggle between "Collaborate" and "Uncollaborate"
      const newStatus =
        prevStatus[0] === "Collaborate" ? ["Uncollaborate"] : ["Collaborate"];

      console.log("newStatus:", newStatus);

      if (newStatus[0] === "Collaborate") {
        deleteCollab(course, question);
      } else {
        addCollab(course, question);
      }
      return newStatus;
    });
  };

  const handleBackCourse = (course, deviceIdentifier) => {
    console.log(`Navigating to CoursePage with course: ${course.course}`);
    navigation.navigate("CoursePage", { course, deviceIdentifier });
  };

  const handleBackCollab = () => {
    console.log(`Navigating to Collaborating Page`);
    navigation.navigate("CollabPage");
  };

  const handleMessageSend = async (course, question, message) => {
    try {
      console.log(
        "Sending new message:",
        message,
        "to course:",
        course.course,
        "in question:",
        question.question
      );

      await addMessage(course, question, message);
      setText("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const clickMoreModal = () => {
    Keyboard.dismiss();
    setModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { marginBottom: bottomMargin }]}>
        <Text>Device identifier: {deviceIdentifier}</Text>
        <View style={styles.questionPageBox}>
          <View style={styles.questionPageBoxHeader}>
            {course.course ? ( // check if course.course is defined
              <TouchableOpacity
                onPress={() => handleBackCourse(course, deviceIdentifier)}
              >
                <View style={styles.backArrow}>
                  <Icon name="arrow-left" size={20} color="#000" />
                  <Text style={styles.backTEXT}>{course.course}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              // if course.course is undefined, we came from the collab page
              <TouchableOpacity onPress={handleBackCollab}>
                <View style={styles.backArrow}>
                  <Icon name="arrow-left" size={20} color="#000" />
                  <Text style={styles.backTEXT}>Collaborating</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={clickMoreModal}>
              <View style={styles.backArrow}>
                <Icon name="exclamation" size={20} color="#000" />
                <Text style={styles.backTEXT}>More Info</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.questionInfoHeader}>
            <View style={styles.numCollaborators}>
              <Icon
                name="people"
                size={25}
                color="#000"
                style={styles.emojiIcon}
              />
              <Text style={{ fontSize: 20 }}> {question.num_collab} </Text>
            </View>
            <Text style={[styles.questionHost, { fontWeight: "bold" }]}>
              Asked by: {question.author}
            </Text>
            <View style={styles.numInHuddle}>
              <Text style={{ fontSize: 20 }}> {question.num_huddle} </Text>
              <Icon
                name="earphones"
                size={25}
                color="#000"
                style={styles.emojiIcon}
              />
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 17 }}>{question.question}</Text>
          </View>
        </View>

        <ScrollView
          ref={messagesRef}
          style={[styles.chatArea, { paddingBottom: "60%" }]}
        >
          {renderMessages()}
        </ScrollView>

        <View style={styles.inputContainer}>
          <Icon
            name="emotsmile"
            size={25}
            color="#000"
            style={styles.emojiIcon}
          />
          <Icon name="camera" size={26} color="#000" style={styles.emojiIcon} />
          <TextInput
            style={styles.input}
            placeholder="Click to start typing…"
            value={message}
            onChangeText={(newMessage) => setText(newMessage)}
          />
          <TouchableOpacity
            onPress={() => handleMessageSend(course, question, message)}
          >
            <Icon
              name="paper-plane"
              size={25}
              color="#000"
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>

        {isModalVisible && (
          <View style={styles.customModalOverlay}>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={clickMoreModal}>
                    <View style={styles.cancelButton}>
                      <Icon name="close" size={20} color="#000" />
                      <Text style={styles.cancelTEXT}></Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalHeaderTEXT}>Question Information</Text>
                <Text style={styles.modalHeaderTEXT2}>
                  Course: {course.course} {"\n"}
                  Asked by: {question.author} {"\n"}
                  Posted: {question.created} {"\n"} {"\n"}
                  Current Collaborators: {question.num_collab} {"\n"} {"\n"}
                  {/* Total Collaborators: {question.num_collab} {'\n'} {'\n'} */}
                  Last Active: XXX
                </Text>

                <View style={styles.modalCollabUncollab}>
                  <TouchableOpacity
                    style={styles.modalCollabUncollabTEXT}
                    onPress={() => handleCollabUncollabPress(course, question)}
                  >
                    <Text style={styles.courseCollabButtonText}>
                      {collabStatus}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default QuestionPage;
