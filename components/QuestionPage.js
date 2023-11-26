import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const QuestionPage = ({ route }) => {
  const { question, course } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState('');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const navigation = useNavigation();

  const handleBackCourse = () => {
    // navigate to CoursePage with the courseName parameter
    console.log(`Navigating to CoursePage with course: ${course.name}`);
    navigation.navigate('CoursePage', { course });
  };

  const clickMoreModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
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

      <TextInput
        style={styles.input}
        placeholder="Click here…"
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={styles.status}>{keyboardStatus}</Text>

      {/* modal overlay */}
      {isModalVisible && (
        <View style={styles.customModalOverlay}>
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
        </View>
      )}
    </View>
  );
};

export default QuestionPage;
