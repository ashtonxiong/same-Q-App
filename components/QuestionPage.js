import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, Platform, ScrollView, KeyboardAvoidingView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const QuestionPage = ({ route }) => {

  // Edit this to change WoZ messages
  const messagesStart = [
    new Message(
      "Anyone made any progress?", // Message string
      1701481572000, //Time
      123, //User ID
      "Adam", // User Name
      0 //Message Key
    ),
    new Message(
      "I got through part b, but after that I'm lost",
      1701481692000,
      456, // user
      "Jenna",
      1
    ),
  ];

  //State variables.
  const [messages, setMessages] = useState(messagesStart); // Should be hooked up to db
  const { question, course, object } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const messagesRef = useRef();
  const navigation = useNavigation();
  const [text, setText] = useState(""); // also hook up to db?
  const textInputRef = useRef(null);

  // Track the text being typed into the message field. This one's important.
  // SECURITY: Before we wire this up to a database, we 
  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  // Returns to the previous page
  const handleBackCourse = () => {
    console.log(`Navigating to CoursePage with course: ${course.name}`);
    navigation.navigate("CoursePage", { course });
  };

  // This ensures we're always at the end of the message string when we activate or deactivate the keyboard.
  useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        messagesRef.current.scrollToEnd({ animated: true });
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        messagesRef.current.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Show/Hide info page
  const clickMoreModal = () => {
    Keyboard.dismiss()
    setModalVisible(!isModalVisible);
  };

  // Display the last active time
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  function returnLastActive() {
    const lastMessageTime = messages[messages.length - 1].time;
    const lastActiveDate = new Date(lastMessageTime);
    return formatter.format(lastActiveDate);
  }

  // Handles message tracking and display
  function Message(text, time, senderID, senderName, key) {
    this.text = text;
    this.time = time;
    this.sender = senderID;
    this.senderName = senderName;
    this.key = key;

    this.color = senderID != 0 ? "lightgrey" : "#5052b5";
    this.textColor = senderID != 0 ? "black" : "white";
    this.alignment = senderID != 0 ? "flex-start" : "flex-end";
  }

  // Uses the custom message object above to add a new item to the messages List
  const addMessage = () => {
    if (text.trim() === "") {
      // Don't add empty items
      return;
    }

    setMessages((messages) => [
      ...messages,
      new Message(text, Date.now(), 0, "You", messages.length),
    ]);
    setText(""); // Clear the TextInput after adding an item
  };

  // This code ensures that the sender name only shows on the first message they send when a single user sends multiple messages back-to-back
  function returnSender(thisMessage) {
    if (thisMessage.key != 0) {
      if (messages[thisMessage.key - 1].sender == thisMessage.sender) {
        return <View></View>;
      }
    }

    return (
      <Text style={[styles.senderStyle, { alignSelf: thisMessage.alignment }]}>
        {thisMessage.senderName}
      </Text>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
      style={{ flex: 1 }}
    >
      <View style={[styles.container]}>
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.infoButton} onPress={clickMoreModal}>
            <View>
              <Icon name="exclamation" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackCourse}
          >
            <View style={styles.info}>
              <Icon name="arrow-left" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <Text style={styles.questionTEXT}>
            {question.text} Blah blah Blah blahBlah blahBlah blahBlah blahBlah
            blahBlah blah Blah blah
          </Text>
        </View>

        {/* Area for texts*/}
        <View style={styles.chatArea}>
          <ScrollView
            ref={messagesRef}
            onContentSizeChange={() =>
              messagesRef.current.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message) => (
              <View key={message.key}>
                {returnSender(message)}
                <View
                  key={message.time}
                  style={[
                    styles.message,
                    {
                      backgroundColor: message.color,
                      alignSelf: message.alignment,
                    },
                  ]}
                >
                  <Text
                    style={[styles.messageTEXT, { color: message.textColor }]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          {/* <Icon
            name="emotsmile"
            size={25}
            color="#000"
            style={styles.emojiIcon}
          />
          <Icon name="camera" size={26} color="#000" style={styles.emojiIcon} /> */}
          <TextInput
            ref={textInputRef}
            placeholder="Click to start typing…"
            placeholderTextColor="#545353"
            onChangeText={handleTextChange}
            style={styles.input}
            value={text}
            multiline
            onContentSizeChange={(e) => {
              textInputRef.current.setNativeProps({
                height: Math.max(30, e.nativeEvent.contentSize.height),
              });
            }}
          ></TextInput>
          <TouchableOpacity>
            <Icon
              name="paper-plane"
              size={25}
              color="#000"
              style={styles.cameraIcon}
              onPress={addMessage}
            />
          </TouchableOpacity>
        </View>

        {isModalVisible && (
          <View style={styles.customModalOverlay}>
            <Pressable //Do I understand the difference between Pressable and Touchable? Noooope. But only Pressable works here. I hate RN.
              style={styles.overlay}
              onPress={clickMoreModal}/>
            <View style={styles.modalContent}>
              <TouchableWithoutFeedback //This is Without Feedback due to a modal rendering bug
                onPress={clickMoreModal}
                style={[styles.cancelButton, {padding: 30}]}
              >
                <Icon
                  name="close"
                  size={20}
                  style={{alignSelf: 'flex-end'}}
                  color="#000"
                  accessibilityLabel="close"
                />     
              </TouchableWithoutFeedback>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderTEXT}>
                  Question Information
                </Text>
                <Text style={styles.modalHeaderTEXT2}>
                  Course: {course.name} {"\n"}
                  Asked by: {question.askedBy}
                  {"\n"}
                  {"\n"}
                  Current Collaborators: {question.numPeople} {"\n"}
                  {"\n"}
                  Last Active: {returnLastActive()}
                </Text>
              </View>
              

              <View style={styles.modalUncollab}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleBackCourse}
                  // onPress={() => handleCollabPress('FIRST TWO LINES OF QUESTION')}
                >
                  <Text style={styles.buttonText}>
                    Leave Question
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default QuestionPage;