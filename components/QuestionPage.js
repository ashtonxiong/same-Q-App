import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const QuestionPage = ({ route }) => {
  const { question, course, object } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [bottomMargin, setBottomMargin] = useState(0);

  const [messages, setMessages] = useState([
    {text: "Does anyone know how to pick good colors that match but don't conlfict and are friendly for people with color defficiencies", color: "gray" },
    {text: "Hey Batman, I think if you go through today's lecture, Prof Landay talked about color schemes and different color contrasts", color: "purple" },
    {text: "Thanks! I'll take a look after I protect gotham tonight", color: "gray" },
    {text: "No Worries! Anytime", color: "gray" },
    {text: "Does anyone know how to pick good colors that match but don't conlfict and are friendly for people with color defficiencies", color: "gray" },
    {text: "Hey Batman, I think if you go through today's lecture, Prof Landay talked about color schemes and different color contrasts", color: "purple" },
    {text: "Thanks! I'll take a look after I protect gotham tonight", color: "gray" },
    {text: "No Worries! Anytime", color: "gray" },
    {text: "Does anyone know how to pick good colors that match but don't conlfict and are friendly for people with color defficiencies", color: "gray" },
    {text: "Hey Batman, I think if you go through today's lecture, Prof Landay talked about color schemes and different color contrasts", color: "purple" },
    {text: "Thanks! I'll take a look after I protect gotham tonight", color: "gray" },
    {text: "No Worries! Anytime", color: "gray" },
    {text: "Does anyone know how to pick good colors that match but don't conlfict and are friendly for people with color defficiencies", color: "gray" },
    {text: "Hey Batman, I think if you go through today's lecture, Prof Landay talked about color schemes and different color contrasts", color: "purple" },
    {text: "Thanks! I'll take a look after I protect gotham tonight", color: "gray" },
    {text: "No Worries! Anytime", color: "gray" },    {text: "Does anyone know how to pick good colors that match but don't conlfict and are friendly for people with color defficiencies", color: "gray" },
    {text: "Hey Batman, I think if you go through today's lecture, Prof Landay talked about color schemes and different color contrasts", color: "purple" },
    {text: "Thanks! I'll take a look after I protect gotham tonight", color: "gray" },
    {text: "No Worries! Anytime", color: "gray" },
    {text: "Does anyone know how to pick good colors that match but don't conlfict and are friendly for people with color defficiencies", color: "gray" },
    {text: "Hey Batman, I think if you go through today's lecture, Prof Landay talked about color schemes and different color contrasts", color: "purple" },
    {text: "Thanks! I'll take a look after I protect gotham tonight", color: "gray" },
    {text: "No Worries! Anytime", color: "gray" },
  ]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setBottomMargin(Platform.OS === 'ios' ? 0 : 0); // Adjust this value based on your layout
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
    return messages.map((message, index) => {
      if (message.color === "gray") {
        return (
          <View key={index} style={[styles.grayTextMessageContainer]}>
            <Text style={{ marginRight: '2%' }}>PFP</Text>
            <View style={styles.grayMessage}>
              <Text>{message.text}</Text>
            </View>
          </View>
        );
      } else {
        return (
          <View key={index} style={[styles.purpleTextMessageContainer]}>
            <View style={styles.purpleMessage}>
              <Text>{message.text}</Text>
            </View>
            <Text style={{ marginRight: '2%' }}>PFP</Text>
          </View>
        );
      }
    });
  };

  const handleBackCourse = () => {
    console.log(`Navigating to CoursePage with course: ${course.name}`);
    navigation.navigate('CoursePage', { course });
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
        <View style={styles.questionPageBox}>
          <View style={styles.questionPageBoxHeader}>
            <TouchableOpacity onPress={handleBackCourse}>
              <View style={styles.backArrow}>
                <Icon name="arrow-left" size={20} color="#000" />
                <Text style={styles.backTEXT}>{course.name}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={clickMoreModal}>
              <View style={styles.backArrow}>
                <Icon name="exclamation" size={20} color="#000" />
                <Text style={styles.backTEXT}>More</Text>
              </View>
            </TouchableOpacity>
          </View>

         <View style={styles.questionInfoHeader}>
            <View style={styles.numCollaborators}>
                <Icon name="people" size={25} color="#000" style={styles.emojiIcon} />
                <Text style={{fontSize: 20}}> {question.numPeople} </Text>
            </View>
            <Text style={[styles.questionHost, { fontWeight: 'Bold' }]} >Asked by: {question.askedBy}</Text>
            <View style={styles.numInHuddle}>
                <Text style={{fontSize: 20}}> {question.earphone}  </Text>
                <Icon name="earphones" size={25} color="#000" style={styles.emojiIcon} />
            </View>
          </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 17}}>{question.text}</Text>
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
                    Course: {course.name} {'\n'}
                    Asked by: {question.askedBy}
                    Created on: XXX {'\n'} {'\n'}

                    Current Collaborators: {question.numPeople} {'\n'}
                    Total Collaborators: {question.numPeople + question.earphone} {'\n'} {'\n'}

                    Last Active: XXX
                </Text>

                <View style={styles.modalUncollab}>
                    <TouchableOpacity
                        style={styles.uncollabButton}
                        // onPress={() => handleCollabPress('FIRST TWO LINES OF QUESTION')}
                        >
                        <Text style={styles.courseCollabButtonText}>Uncollaborate</Text>
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