import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

const CoursePage = ({ route }) => {
  const { course } = route.params;

  const navigation = useNavigation();

  const handleCollabPress = (questionText) => {
    // navigate to QuestionPage with the question parameter
    console.log(`Navigating to QuestionPage with question: ${questionText}`);
    navigation.navigate('QuestionPage', { question: questionText });
  };  

  return (
    <View style={styles.container2}>
      <Text style={styles.pageHeader}>{course.name}</Text>
      <Text style={styles.sectionHeader}>Queue</Text>

      <View style={styles.questionBox}>
        <Text style={styles.questionTEXT}>FIRST TWO LINES OF QUESTION</Text>
        <TouchableOpacity
          style={styles.collabButton}
          onPress={() => handleCollabPress('FIRST TWO LINES OF QUESTION')}
        >
          <Text style={styles.collabButtonTEXT}>Collaborate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CoursePage;
