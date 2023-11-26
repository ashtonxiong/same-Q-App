import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const QuestionPage = ({ route }) => {
  const { question, course } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState('');
  const [bottomMargin, setBottomMargin] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus('Keyboard Shown');
        setBottomMargin(Platform.OS === 'ios' ? 250 : 100); // Adjust this value based on your layout
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus('Keyboard Hidden');
        setBottomMargin(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigation = useNavigation();

  const handleBackCourse = () => {
    console.log(`Navigating to CoursePage with course: ${course.name}`);
    navigation.navigate('CoursePage', { course });
  };

  const clickMoreModal = () => {
    Keyboard.dismiss();
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            placeholder="Click to start typing…"
            onSubmitEditing={Keyboard.dismiss}
          />
          <Text style={styles.status}>{keyboardStatus}</Text>
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
                <Text>TESTING MODAL WINDOW</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default QuestionPage;
