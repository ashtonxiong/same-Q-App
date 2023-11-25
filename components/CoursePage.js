import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CoursePage = ({ route }) => {
  const { course } = route.params;

  const navigation = useNavigation();

  const handleCollabPress = (questionText) => {
    // navigate to QuestionPage with the question parameter
    console.log(`Navigating to QuestionPage with question: ${questionText}`);
    navigation.navigate('QuestionPage', { question: questionText });
  };  

  const handleBackHome = (home) => {
    // navigate back to HomePage
    console.log(`Navigating to HomePage`);
    navigation.navigate('HomePage');
  };  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleBackHome}>
      <View style={styles.backArrow}>
        <Icon name="arrow-left" size={20} color="#000"/>
        <Text style={styles.backTEXT}>Home</Text>
      </View>
      </TouchableOpacity>

      <View style={styles.container2}>
        <Text style={styles.pageHeader}>{course.name}</Text>
        <Text style={styles.sectionHeader}>Queue</Text>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.questionBox}>
          <Text style={styles.questionTEXT}>FIRST TWO LINES OF QUESTION</Text>
          <TouchableOpacity
            style={styles.collabButton}
            onPress={() => handleCollabPress('FIRST TWO LINES OF QUESTION')}>
            <Text style={styles.collabButtonTEXT}>Collaborate</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default CoursePage;
