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
  Modal,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { supabase } from "../supabase";
import { Camera, CameraType } from "expo-camera";
import * as FileSystem from "expo-file-system";

const { parse, getTime } = require("date-fns");
import HuddleUI from "./HuddleUI";
import BlinkingDot from "./BlinkingDot";
import { Audio } from "expo-av";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const QuestionPage = ({ route }) => {
  const { question, course, deviceIdentifier } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isHuddleModalVisible, setHuddleModalVisible] = useState(false);
  const [isPeopleModalVisible, setPeopleModalVisible] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(0);
  const [actualNumCollaborators, setNumCollaborators] = useState(
    question.num_collab
  );
  const [inHuddle, setInHuddle] = useState(false);

  const [chatsArray, setChatsArray] = useState([]);
  const [defaultChatsArray, setDefaultChatsArray] = useState([]);
  const [message, setText] = useState("");
  const messagesRef = useRef(null);
  const isFocused = useIsFocused();

  const [collabStatus, setCollabStatus] = useState(["Collaborate"]);
  const [isMuted, setMuted] = useState(true);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [messageArray, setMessageArray] = useState([]);

  const getChats = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-chats")
        .select("*")
        .eq("course", question.course)
        .eq("question", question.question)
        .eq("question_id", question.question_id)
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
          question_id: item.question_id,
        }));
        setChatsArray(newChats);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const getDefaultChats = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-chats")
        .select("*")
        .eq("course", question.course)
        .eq("question", question.question)
        .eq("question_id", question.question_id)
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
          question_id: item.question_id,
        }));

        setDefaultChatsArray(newChats);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const addMessage = async (course, question, message) => {
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleString("en-US", {
        month: "long",
      })} ${currentDate.getDate()}, ${currentDate.getFullYear()}, ${currentDate.toLocaleString(
        "en-US",
        { hour: "numeric", minute: "numeric", hour12: true }
      )}`;

      const { error } = await supabase.from("sameQ-chats").insert([
        {
          course: question.course,
          question: question.question,
          sender: "You",
          message: message,
          time: formattedDate,
          device_id: deviceIdentifier,
          question_id: question.question_id,
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

  const addCollab = async (course, questionObj) => {
    //question_id not passed into params
    try {
      const { error } = await supabase.from("sameQ-app-collab").insert([
        {
          question: questionObj.question,
          created: "January 1, 2023, 3:00 PM",
          author: questionObj.author,
          num_collaborators: 0,
          num_huddle: 0,
          expected_help: "3:15 PM",
          collab_status: "TRUE",
          course: `${course.course}`,
          collaborators: {},
          huddlers: {},
          question_id: `${question.question_id}`,
          device_id: `${deviceIdentifier}`,
        },
      ]);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);
    }
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

  const getCollabStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-app-collab")
        .select("collab_status", "num_collaborators")
        .eq("question", question.question)
        .eq("question_id", question.question_id)
        .eq("device_id", deviceIdentifier);

      if (data && data.length > 0) {
        setCollabStatus([
          data[0].collab_status ? "Uncollaborate" : "Collaborate",
        ]);
        setNumCollaborators(data[0].num_collaborators);
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

  useFocusEffect(
    React.useCallback(() => {
      getCollabStatus(); // fetch the collaboration status when navigating back into modal
      getDefaultChats();
      getChats();
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

  const toggleMuted = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const handleToggleHuddle = () => {
    setInHuddle((prevIsInHuddle) => !prevIsInHuddle);
  };

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

    // combine default and new chats and images if any
    const combinedChats = [...sortedChatsArray, ...chatsArray];
    var int = 0;

    return combinedChats.map((chat) => {
      if (chat.image) {
        int += 1;

        return (
          <View key={int} style={styles.messageAndTimeContainer}>
            <View style={[styles.purpleTextMessageContainer]}>
              <View style={styles.purpleMessage}>
                <Image
                  source={{ uri: chat.source }}
                  style={{ height: 100, width: 100, padding: 10 }}
                />
              </View>
            </View>
            <Text style={styles.purpleTextMessageTime}>{chat.timeSent}</Text>
          </View>
        );
      }
      if (chat.sender !== "You") {
        int += 1;

        return (
          <View key={int} style={styles.messageAndTimeContainer}>
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
        int += 1;
        return (
          <View key={int} style={styles.messageAndTimeContainer}>
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

      console.log("newStatus:", question);

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
    // navigation.navigate("CoursePage", { course, deviceIdentifier });
    if (inHuddle) {
      // Show a pop-up message if inHuddle is true
      Alert.alert(
        "Cannot Leave Question Page",
        "Please leave the huddle before exiting the question.",
        [{ text: "OK", onPress: () => {} }]
      );
    } else {
      // If not in the huddle, navigate to the CoursePage
      navigation.navigate("CoursePage", { course, deviceIdentifier });
    }
  };

  const handleBackCollab = () => {
    navigation.navigate("CollabPage");
  };

  const handleMessageSend = async (course, question, message) => {
    //  try {
    //  console.log(
    //    "Sending new message:",
    //    message,
    //    "to course:",
    //    course.course,
    //    "in question:",
    //    question.question
    //  );

    //  await addMessage(course, question, message);
    //  setText("");
    try {
      if (collabStatus[0] === "Collaborate") {
        // Show an alert if collaboration is required
        Alert.alert(
          "Cannot Send Message",
          "Begin collaborating on the question first!",
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        // Send the message if collaboration is not required
        console.log(
          "Sending new message:",
          message,
          "to course:",
          course.course,
          "in question:",
          question.question
        );

        await addMessage(course, question, message);
        setText(""); // Clear the message input
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const clickMoreModal = () => {
    Keyboard.dismiss();
    setModalVisible(!isModalVisible);
  };
  const clickHuddleModal = () => {
    setHuddleModalVisible(!isHuddleModalVisible);
  };

  const closeHuddleModal = () => {
    setHuddleModalVisible(false);
  };

  const clickPeopleModal = () => {
    setPeopleModalVisible(!isPeopleModalVisible);
  };

  const closePeopleModal = () => {
    setPeopleModalVisible(false);
  };

  const openCamera = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  const closeCamera = () => {
    setIsCameraOpen(!isCameraOpen);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      // Handle the captured image URI as needed

      const directory = `${FileSystem.documentDirectory}images/`;
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      // Move the image to the images folder
      const newUri = `${directory}${Date.now()}.jpg`;
      await FileSystem.moveAsync({ from: uri, to: newUri });

      // console.log("FileSystem", FileSystem.documentDirectory);
      setCapturedImageUri(newUri);
      // closeCamera();
      // setCapturedImageUri(uri);
      // closeCamera();
    }
  };

  const useImage = () => {
    setCapturedImageUri(null);
    closeCamera();
    const imageObject = {
      image: true,
      source: capturedImageUri,
      sender: "YOU",
      timeSent: new Date().toLocaleString(),
      device_id: deviceIdentifier,
    };

    const temp1 = [...chatsArray, imageObject];
    setChatsArray(temp1);
  };

  const retakeImage = () => {
    setCapturedImageUri(null);
  };
  const handleLeaveHuddle = () => {
    setInHuddle(false);
    stopHuddleSound();
  };

  const [sound, setSound] = useState(null);
  const isSoundLoaded = useRef(false);
  const [soundDidLoad, setSoundDidLoad] = useState(false);

  const loadSoundAsync = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../assets/school_dialogue_trimmed.mp3")
      );
      isSoundLoaded.current = true;
      setSound(newSound); // Set the sound after loading
      setSoundDidLoad(true);
      console.log("Sound loaded successfully");
    } catch (error) {
      console.error("Error loading sound:", error.message);
    }
  };

  const unloadSoundAsync = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null); // Clear the sound after unloading
        console.log("Sound unloaded successfully");
      }
    } catch (error) {
      console.error("Error unloading sound:", error.message);
    }
  };

  const playHuddleOpenSound = async () => {
    try {
      console.log("inHuddle:", inHuddle);
      console.log("isSoundLoaded.current:", isSoundLoaded.current);
      console.log("sound:", sound);
      console.log("soundDidLoad:", soundDidLoad);
      if (inHuddle && isSoundLoaded.current && sound && soundDidLoad) {
        await sound.playAsync({ positionMillis: 0 });
        // await loadSoundAsync();
        console.log("Sound played successfully");
      } else {
        console.warn(
          "Cannot play sound. Check inHuddle and sound loading status."
        );
      }
    } catch (error) {
      console.error("Error playing sound:", error.message);
    }
  };

  const stopHuddleSound = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await unloadSoundAsync();
        console.log("Sound stopped and unloaded successfully");
      }
    } catch (error) {
      console.error("Error stopping sound:", error.message);
    }
  };

  useEffect(() => {
    // Load the sound when the component mounts
    loadSoundAsync();

    // Unload the sound when the component unmounts
    return () => {
      unloadSoundAsync();
    };
  }, []);

  useEffect(() => {
    if (inHuddle) {
      playHuddleOpenSound();
    }
  }, [inHuddle, sound, soundDidLoad]);
  // console.log('status:', inHuddle)

  const renderCamera = () => {
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        {capturedImageUri ? (
          <ImageBackground
            source={{ uri: capturedImageUri }}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={styles.bottomRowContainer}>
                <View style={styles.retakeButton}>
                  <TouchableOpacity onPress={() => retakeImage()}>
                    <Text style={[{ fontSize: 15, color: "white" }]}>
                      Retake
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.usePicButton}>
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => useImage()}
                  >
                    <Text style={{ color: "white", fontSize: 15 }}>Use</Text>
                    <Icon
                      name="arrow-right"
                      size={15}
                      color="white"
                      style={{ paddingRight: 65 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        ) : (
          <Camera
            style={{
              flex: 1,
              justifyContent: "flex-end",
              borderWidth: 2,
            }}
            type={type}
            ref={cameraRef}
          >
            <View style={styles.cameraExitButton}>
              <TouchableOpacity onPress={() => closeCamera()}>
                <Text style={{ color: "white", fontSize: 40 }}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.takePictureButtonContainer}>
              <TouchableOpacity
                style={styles.takePictureButton}
                onPress={handleTakePicture}
              ></TouchableOpacity>
            </View>
            <View style={styles.flipContainer}>
              <TouchableOpacity
                style={styles.flipCameraButton}
                onPress={toggleCameraType}
              >
                <Icon name="shuffle" color="white" size={40}></Icon>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      style={{ flex: 1 }}
    >
      {isCameraOpen ? (
        renderCamera()
      ) : (
        <View style={[styles.container, { marginBottom: bottomMargin }]}>
          {/* <Text>Device identifier: {deviceIdentifier}</Text> */}
          <Image source={{ uri: capturedImageUri }} />
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
                <TouchableOpacity onPress={clickPeopleModal}>
                  <View style={styles.backArrow}>
                    <Icon name="people" size={30} color="#000" />
                  </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}> {actualNumCollaborators} </Text>
              </View>
              <Text style={[styles.questionHost, { fontWeight: "bold" }]}>
                Asked by: {question.author}
              </Text>
              <View style={styles.numInHuddle}>
                {inHuddle && <BlinkingDot inHuddle={inHuddle} />}
                <TouchableOpacity onPress={clickHuddleModal}>
                  <View style={styles.backArrow}>
                    <Icon name="earphones" size={30} color="#000" />
                  </View>
                </TouchableOpacity>
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
            {collabStatus[0] === "Collaborate" ? (
              <TouchableOpacity>
                <Icon
                  name="camera"
                  size={26}
                  color="#000"
                  style={styles.emojiIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => openCamera()}>
                <Icon
                  name="camera"
                  size={26}
                  color="#000"
                  style={styles.emojiIcon}
                />
              </TouchableOpacity>
            )}

            {collabStatus[0] === "Collaborate" ? (
              <Text style={styles.input2}>
                Begin collaborating on the question first!
              </Text>
            ) : (
              <TextInput
                style={styles.input}
                placeholder="Click to start typing…"
                value={message}
                onChangeText={(newMessage) => setText(newMessage)}
              />
            )}

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
                  <Text style={styles.modalHeaderTEXT}>
                    Question Information
                  </Text>
                  <Text style={styles.modalHeaderTEXT2}>
                    Course: {course.course} {"\n"}
                    Asked by: {question.author} {"\n"}
                    Posted: {question.created} {"\n"} {"\n"}
                    Current Collaborators: {actualNumCollaborators} {"\n"}{" "}
                    {"\n"}
                    {/* Total Collaborators: {question.num_collab} {'\n'} {'\n'} */}
                    Last Active: XXX
                  </Text>

                  <View style={styles.modalCollabUncollab}>
                    <TouchableOpacity
                      style={styles.modalCollabUncollabTEXT}
                      onPress={() =>
                        handleCollabUncollabPress(course, question)
                      }
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

          <Modal transparent={true} visible={isHuddleModalVisible}>
            <TouchableWithoutFeedback onPress={closeHuddleModal}>
              <View style={styles.customHuddleModalOverlay}>
                <TouchableWithoutFeedback onPress={() => {}}>
                  {collabStatus[0] === "Collaborate" ? (
                    <View style={styles.huddleModalContent2}>
                      <Text style={styles.huddleModalHeaderText}>
                        Begin collaborating on the question first!
                      </Text>
                      <Text style={styles.huddleModalBodyText}>
                        Click the 'More Info' to collaborate.
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.huddleModalContent}>
                      <Text style={styles.collabModalHeaderText}>Huddle</Text>
                      <Text style={styles.collabModalBodyText}>
                        {inHuddle
                          ? `${question.num_huddle} others in huddle with you.`
                          : `Join ${question.num_huddle} others in huddle.`}
                      </Text>
                      <HuddleUI
                        huddlers={question.huddlers}
                        isMuted={isMuted}
                        toggleMuted={toggleMuted}
                        isInHuddle={inHuddle}
                        onToggleHuddle={handleToggleHuddle}
                        onLeaveHuddle={handleLeaveHuddle}
                      />
                      {/* </Text> */}
                    </View>
                  )}
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal transparent={true} visible={isPeopleModalVisible}>
            <TouchableWithoutFeedback onPress={closePeopleModal}>
              <View style={styles.customHuddleModalOverlay}>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View style={styles.huddleModalContent}>
                    <Text style={styles.collabModalHeaderText}>
                      Collaborators
                    </Text>
                    <Text style={styles.collabModalBodyText}>
                      {actualNumCollaborators} Collaborators
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default QuestionPage;
