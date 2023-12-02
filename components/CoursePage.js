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
  
      console.log('data: ', data);
      console.log('error: ', error);
  
      if (data) {
        // Now 'data' is an array of objects with 'id' and 'course' columns
        const coursesArray = data.map(item => ({
          id: item.id,
          course: item.course,
          question: item.question,
          author: item.author,
          num_collab: item.num_collaborators,
          num_huddle: item.num_huddle,
          help: item.expected_help,
        }));
  
        setQuestions(coursesArray);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error.message);
    }
  };

  useEffect(() => {
    getQuestions();
  }, [])

  // const [times, setTimes] = useState([
  //   { numPeople: 2, time: "2:15", earphone: 0, 
  //   text: "How do I my highlight reel to the AFS Directory?", 
  //   askedBy: 'LeBron James', id: 1 },
  //   { numPeople: 3, time: "2:30", earphone: 2, 
  //   text: "Where should I conduct Interviews for my needfinding?", askedBy: 'Donald Glover',id: 2 },
  //   { numPeople: 2, time: "2:45", earphone: 2, 
  //   text: "How do I add audio and a pulsing effect to the medium-fi prototype?", askedBy: 'Sally Ride', id: 3 },
  //   { numPeople: 10, time: "3:00", earphone: 5, 
  //   text: "How do I add my songs to the hi-fi prototype?", askedBy: 'Taylor Swift', id: 4 },
  //   { numPeople: 3, time: "3:15", earphone: 2, 
  //   text: "How can I align our app's theme with my nocturnal aesthetic without disrupting existing color schemes?", askedBy: "Batman",id: 5 },
  // ]);

  const handleCollabPress = (course, question) => {
    // navigate to QuestionPage with the question parameter
    console.log(`Navigating to QuestionPage with question: ${course.question}`);
    navigation.navigate('QuestionPage', { course, question });
  };  

  const handleBackHome = (home) => {
    // navigate back to HomePage
    console.log(`Navigating to HomePage`);
    navigation.navigate('HomePage');
  };  

  return (
    <View style={styles.container}>

      {/* <View style={styles.appBar}>
        <TouchableOpacity
          onPress={handleBackHome}>
        <View style={styles.backArrow}>
          <Icon name="arrow-left" size={20} color="#000"/>
          <Text style={styles.backTEXT}>Home</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.className}>
          <Text style={styles.classNameText}> CLASS NAME </Text>
        </View>
      </View> */}

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

          {questions.map((question) => (
            <View key={question.id} style={styles.queueBox}>
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
            <View style={styles.queueBot}>
            <TouchableOpacity
              style={styles.queueButton}
              onPress={() => handleCollabPress(course, question)}
            >
              <Text style={styles.queueButtonText}> Collaborate </Text>
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
