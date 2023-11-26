import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const QuestionPage = ({ route }) => {
  const { question, course } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleBackCourse = () => {
    console.log(`Navigating to CoursePage with course: ${course.name}`);
    navigation.navigate('CoursePage', { course });
  };

  const clickMoreModal = () => {
    Keyboard.dismiss(); // dismiss keyboard explicitly
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
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
                <Text style={styles.backTEXT}>More </Text>
                <Icon name="exclamation" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          <Text>QUESTION TEXT AND INFO HERE</Text>
        </View>

        <View style={styles.bottomSection2}>
          <TextInput
            style={styles.input}
            placeholder="Click here…"
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>

        {/* modal overlay */}
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
                <Text>TESTING MODAL WINDOW</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default QuestionPage;
