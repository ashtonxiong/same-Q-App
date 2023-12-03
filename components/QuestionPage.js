import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { supabase } from '../supabase';
const { parse, getTime } = require('date-fns');

const QuestionPage = ({ route }) => {
  const { question, course, deviceIdentifier } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(0);

  const questionText = question.question;
  const courseName = course.course; 
  const [chatsArray, setChatsArray] = useState([]);

  const [collabStatus, setCollabStatus] = useState([
    "Collaborate"
  ]);

  const getChats = async () => {
    try {
      console.log(typeof deviceIdentifier)
      const { data, error } = await supabase
        .from("sameQ-chats")
        .select('*')
        .eq('course', courseName)
        .eq('question', questionText)
        .or('device_id.eq.000, device_id.eq.', deviceIdentifier);

        if (error) {
          throw new Error(error.message);
        }
  
        if (data) {
          // 'data' is an array of objects with columns
          const chatsArray = data.map(item => ({
            uid: item.uid,
            sender: item.sender,
            senderInitials: item.sender_initials,
            message: item.message,
            timeSent: item.time,
          }));
    
          setChatsArray(chatsArray);
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
      }
    };

    const addCollab = async (course, question) => {
      try {
        console.log('device in in addCollab', deviceIdentifier)
        console.log('course to add:', course.course);
        console.log('question to add:', question.question);
        const { error } = await supabase
          .from('sameQ-app-questions')
          .upsert([
            { 
              course: course.course,
              question: question.question,
              author: question.author,
              num_collaborators: question.num_collab,
              num_huddle: question.num_huddle,
              created: question.created,
              expected_help: question.expected_help,
              collab_status: 'TRUE',
              device_id: deviceIdentifier,
            }
          ]);
          // .eq('uid', question.uid);

          if (error) {
            throw new Error(error.message);
          }
      } catch (error) {
        console.error('Error adding data into Supabase:', error.message);
      }
    };

    const deleteCollab = async (course, question) => {
      try {
        console.log('course to delete:', course.course);
        console.log('question to delete:', question.question);
        const { error } = await supabase
          .from('sameQ-app-questions')
          .update([
            { collab_status: 'FALSE' }
          ])
          // .eq('uid', question.uid);
          .eq('device_id', deviceIdentifier)
          .eq('course', course.course)
          .eq('question', question.question);

          if (error) {
            throw new Error(error.message);
          }
      } catch (error) {
        console.error('Error deleting data from Supabase:', error.message);
      }
    };

    const getCollabStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("sameQ-app-questions")
          .select('collab_status')
          .eq('question', question.question)
          .eq('device_id', deviceIdentifier);
  
        if (data && data.length > 0) {
          setCollabStatus([data[0].collab_status ? 'Uncollaborate' : 'Collaborate']);
        }
      } catch (error) {
        console.error('Error fetching data from Supabase:', error.message);
      }
    };

  useEffect(() => {
    getChats();
    getCollabStatus;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCollabStatus(); // fetch the collaboration status when navigating back into modal
    }, [])
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setBottomMargin(Platform.OS === 'ios' ? 0 : 0); // make keyboard and input box smooth
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setBottomMargin(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigation = useNavigation();

  const renderMessages = () => {
    if (chatsArray.length === 0) {
      return (
        <Text style={styles.emptyChat}>Be the first one to send a message!</Text>
      )
    }

    // sort chats based on date/time sent
    const sortedChatsArray = [...chatsArray].sort((a, b) => {
      const dateStringA = a.timeSent;
      const dateStringB = b.timeSent;
      const parsedDataA = parse(dateStringA, 'MMMM d, yyyy, h:mm a', new Date());
      const parsedDataB = parse(dateStringB, 'MMMM d, yyyy, h:mm a', new Date());
      const timeA = getTime(parsedDataA);
      const timeB = getTime(parsedDataB);
      return timeA - timeB;
    });
  
    return sortedChatsArray.map((chat) => {
  
      if (chat.sender !== "You") {
        return (
          <View key={chat.uid} style={styles.messageAndTimeContainer}>
          <View style={[styles.grayTextMessageContainer]}>
            <Text style={styles.grayMessageInitials}>{chat.senderInitials}</Text>
            <View style={styles.grayMessage}>
              <Text>{chat.message}</Text>
            </View>
          </View>
            <Text style={styles.grayTextMessageTime}>{chat.timeSent}</Text>
          </View>
        );
      } else {
        return (
          <View key={chat.uid} style={styles.messageAndTimeContainer}>
          <View style={[styles.purpleTextMessageContainer]}>
            <View style={styles.purpleMessage}>
              <Text>{chat.message}</Text>
            </View>
          </View>
          <Text style={styles.purpleTextMessageTime}>{chat.timeSent}</Text>
          </View>
        );
      }
    });
  };
  
  const handleCollabUncollabPress = ( course, question ) => {
    setCollabStatus((prevStatus) => {
      // toggle between "Collaborate" and "Uncollaborate"
      const newStatus = prevStatus[0] === "Collaborate" ? ["Uncollaborate"] : ["Collaborate"];

      console.log('newStatus:', newStatus);

      if (newStatus[0] === 'Collaborate') {
        deleteCollab(course, question);
      } else {
        addCollab(course, question);
      } return newStatus;
    });
  };

  const handleBackCourse = (course, deviceIdentifier) => {
    console.log(`Navigating to CoursePage with course: ${course.course}`);
    navigation.navigate('CoursePage', { course, deviceIdentifier });
  };

  const handleBackCollab = () => {
    console.log(`Navigating to Collaborating Page`);
    navigation.navigate('CollabPage');
  };

  const clickMoreModal = () => {
    Keyboard.dismiss();
    setModalVisible(!isModalVisible);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
      style={{ flex: 1 }}
    >

      <View style={[styles.container, { marginBottom: bottomMargin }]}>
        <Text>Device identifier: {deviceIdentifier}</Text>
        <View style={styles.questionPageBox}>
          {/* <View style={styles.questionPageBoxHeader}>
            <TouchableOpacity onPress={handleBackCourse}>
              <View style={styles.backArrow}>
                <Icon name="arrow-left" size={20} color="#000" />
                <Text style={styles.backTEXT}>{course.course}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={clickMoreModal}>
              <View style={styles.backArrow}>
                <Icon name="exclamation" size={20} color="#000" />
                <Text style={styles.backTEXT}>More Info</Text>
              </View>
            </TouchableOpacity>
          </View> */}

          <View style={styles.questionPageBoxHeader}>
                {course.course ? ( // Check if course.course is defined
                  <TouchableOpacity onPress={() => handleBackCourse(course, deviceIdentifier)}>
                    <View style={styles.backArrow}>
                      <Icon name="arrow-left" size={20} color="#000" />
                      <Text style={styles.backTEXT}>{course.course}</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  // Render alternative content if course.course is undefined
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
                <Icon name="people" size={25} color="#000" style={styles.emojiIcon} />
                <Text style={{fontSize: 20}}> {question.num_collab} </Text>
            </View>
            <Text style={[styles.questionHost, { fontWeight: 'bold' }]} >Asked by: {question.author}</Text>
            <View style={styles.numInHuddle}>
                <Text style={{fontSize: 20}}> {question.num_huddle}  </Text>
                <Icon name="earphones" size={25} color="#000" style={styles.emojiIcon} />
            </View>
          </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 17}}>{question.question}</Text>
          </View>
    </View>

        <ScrollView style={[styles.chatArea, {paddingBottom: '60%'}]}>
          {renderMessages()}
        </ScrollView>

        <View style={styles.inputContainer}>
            <Icon name="emotsmile" size={25} color="#000" style={styles.emojiIcon} />
            <Icon name="camera" size={26} color="#000" style={styles.emojiIcon} />
            <TextInput
            style={styles.input}
            placeholder="Click to start typing…"
            // value={text}
            // onChangeText={(newText) => setText(newText)}
            />
            <Icon name="paper-plane" size={25} color="#000" style={styles.cameraIcon} />
        </View>

        {isModalVisible && (
          <View style={styles.customModalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={clickMoreModal}>
                    <View style={styles.cancelButton}>
                      <Icon name="close" size={20} color="#000" />
                      <Text style={styles.cancelTEXT}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalHeaderTEXT}>Question Information</Text>
                <Text style={styles.modalHeaderTEXT2}>
                    Course: {course.course} {'\n'}
                    Asked by: {question.author} {'\n'}
                    Posted: {question.created} {'\n'} {'\n'}

                    Current Collaborators: {question.num_collab} {'\n'} {'\n'}
                    {/* Total Collaborators: {question.num_collab} {'\n'} {'\n'} */}

                    Last Active: XXX
                </Text>

                <View style={styles.modalCollabUncollab}>
                    <TouchableOpacity
                        style={styles.modalCollabUncollabTEXT}
                        onPress={() => handleCollabUncollabPress( course, question )}
                        >
                        <Text style={styles.courseCollabButtonText}>{collabStatus}</Text>
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