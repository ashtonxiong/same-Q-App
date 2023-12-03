import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { supabase } from '../supabase';

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
          help: item.expected_help,
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
              <Text style={{marginLeft: 'auto'}}> 5 Questions in Queue</Text>
            </View>
            <View style={styles.courseDetailBottom}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Duration: </Text>
                <Text> {course.duration} </Text>
              </View>
              <Text style={{marginLeft: 'auto'}}> 20 Active </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.sectionHeader}>Queue</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          {questions.map((question) => (
            <View key={question.uid} style={styles.queueBox}>
            {/* top row */}
            <View style={styles.queueTopRow}>
              <View style={styles.queuePeopleIcon} >
                <Text style={{fontSize: 17 * scaleFactor, fontWeight: 'bold'}}>{question.num_collab}</Text>
                <Icon name="people" size={20 * scaleFactor} />
              </View>
              <Text style={{ fontSize: 20 + scaleFactor, marginLeft: 5 * scaleFactor, marginRight: 5 * scaleFactor}} >Expected Help at <Text style={{fontWeight: 'bold'}}>{question.help}</Text></Text>
              <View style={styles.queueEarphone}>
                <Icon  name="earphones" size={20 * scaleFactor} />
                <Text style={{fontSize: 20 * scaleFactor, fontWeight: 'bold', marginLeft: 3}}>{question.num_huddle}</Text>
              </View>
            </View>

            {/* middle row */}
            <View style={styles.queueMid}>
              <Text style={{fontSize: 17 * scaleFactor, color: '#000000'}}>{question.question}</Text>
            </View>

            {/* bottom row */}
            <View style={[styles.queueBot ]}>
            <TouchableOpacity
              style={styles.queueButton}
              onPress={() => handleCollabPress(course, question)}
            >
              <Text style={styles.queueButtonText}> View </Text>
            </TouchableOpacity>
            </View>
        </View>
))}

        </ScrollView>
      </View>
    </View>
  );
};

export default CoursePage;
