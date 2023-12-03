import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { supabase } from '../supabase';
const { parse, getTime } = require('date-fns');

const CoursePage = ({ route }) => {
  const { course } = route.params;
  const courseName = course.course;


  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-app-questions")
        .select('*')
        .eq('course', courseName);
  
      if (data) {
        // 'data' is an array of objects with 'id' and 'course' columns
        const questionInfoArray = data.map(item => ({
          uid: item.uid,
          course: item.course,
          question: item.question,
          created: item.created,
          author: item.author,
          num_collab: item.num_collaborators,
          num_huddle: item.num_huddle,
          chats: item.chats,
          expected_help: item.expected_help,
        }));
  
        setQuestions(questionInfoArray);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error.message);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [])

  const handleCollabPress = (course, question) => {
    console.log(`Navigating to QuestionPage with question: ${question.question}`);
    navigation.navigate('QuestionPage', { course, question });
  };  

  const handleBackHome = (home) => {
    console.log(`Navigating to HomePage`);
    navigation.navigate('HomePage');
  };  

  // func to parse "HH:MM a" formatted help times
  const parseTime = (timeString) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hours24 = period === 'PM' ? hours + 12 : hours;
    return [hours24, minutes];
  };

  const renderQuestions = () => {
    if (questions.length === 0) {
      return (
        <Text style={styles.emptyChat}>Be the first one to ask a question!</Text>
      );
    }
  
    // sort the questions based on expected help time
    const sortedQuestionsArray = [...questions].sort((a, b) => {
      const timeA = new Date(2000, 0, 1, ...parseTime(a.expected_help));
      const timeB = new Date(2000, 0, 1, ...parseTime(b.expected_help));
      return timeA - timeB;
    });
  
    return sortedQuestionsArray.map((question) => (
      <View key={question.uid} style={styles.queueBox}>
        {/* top row */}
        <View style={styles.queueTopRow}>
          <View style={styles.queuePeopleIcon}>
            <Text style={{ fontSize: 17 * scaleFactor, fontWeight: 'bold' }}>{question.num_collab}</Text>
            <Icon name="people" size={20 * scaleFactor} />
          </View>
          <Text style={{ fontSize: 20 + scaleFactor, marginLeft: 5 * scaleFactor, marginRight: 5 * scaleFactor }}>Expected Help at <Text style={{ fontWeight: 'bold' }}>{question.expected_help}</Text></Text>
          <View style={styles.queueEarphone}>
            <Icon name="earphones" size={20 * scaleFactor} />
            <Text style={{ fontSize: 20 * scaleFactor, fontWeight: 'bold', marginLeft: 3 }}>{question.num_huddle}</Text>
          </View>
        </View>
  
        {/* middle row */}
        <View style={styles.queueMid}>
          <Text style={{ fontSize: 17 * scaleFactor, color: '#000000' }}>{question.question}</Text>
        </View>
  
        {/* bottom row */}
        <View style={styles.queueBot}>
          <TouchableOpacity
            style={styles.queueButton}
            onPress={() => handleCollabPress(course, question)}
          >
            <Text style={styles.queueButtonText}> View </Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  }
  

  return (
    <View style={styles.container}>

      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={handleBackHome}>
          <View style={styles.backArrow}>
          <Icon name="arrow-left" size={20} color="#000"/>
          <Text style={styles.backTEXT}>Home</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.classNameText}>
            LOGO
          </Text>
        </View> */}
      </View>

      <View>

        <View style={styles.classInfo}>
          <View style={styles.courseHeaderContainer}>
            <Text style={styles.pageHeader}>
              {course.course}
            </Text>
          </View>

          <View style={styles.courseDetails}>
            <View style={styles.courseDetailTop}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Instructor: </Text>
                <Text> {course.instructor} </Text>
              </View>
              <Text style={{marginLeft: 'auto'}}> TEMP</Text>
            </View>
            <View style={styles.courseDetailBottom}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Duration: </Text>
                <Text> {course.duration} </Text>
              </View>
              <Text style={{marginLeft: 'auto'}}> TEMP</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.sectionHeader}>Queue</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {renderQuestions()}
        </ScrollView>
      </View>
    </View>
  );
};

export default CoursePage;
