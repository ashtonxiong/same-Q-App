import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

const activeCourses = [
    { id: '1', name: 'CS 147' },
    { id: '2', name: 'ENGLISH 9CE' },
  ];

const inactiveCourses = [
    { id: '3', name: 'CS 161' },
  ];

const App = () => {
    const navigation = useNavigation();

    const handleJoinPress = (course) => {
      // navigate to CoursePage with the courseName parameter
      console.log(`Navigating to CoursePage with course: ${course.name}`);
      navigation.navigate('CoursePage', { course });
    };  

  return (
    <View style={styles.container1}>
      <Text style={styles.pageHeader}>Courses</Text>

      {/* active office hours */}
      <View style={styles.courseSection}>
        <Text style={styles.sectionHeader}>Active Office Hours</Text>
        <View style={styles.courseContainer}>

      {activeCourses.map((course) => (
        <View key={course.id} style={styles.courseBox}>
          <Text style={styles.courseBoxTEXT}>{course.name}</Text>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinPress(course)}
          >
            <Text style={styles.joinButtonTEXT}>Join</Text>
          </TouchableOpacity>
        </View>
      ))}
        </View>
      </View>

      {/* inactive office hours */}
      <View style={[styles.courseSection, styles.bottomSection]}>
        <Text style={styles.sectionHeader}>Inactive Office Hours</Text>
        <View style={styles.courseContainer}>

        {inactiveCourses.map((course) => (
            <View key={course.id} style={styles.courseBox}>
            <Text style={styles.courseBoxTEXT}>{course.name}</Text>
            <TouchableOpacity
                style={styles.askButton}
                onPress={() => handleJoinPress(course)}
            >
                <Text style={styles.askButtonTEXT}>Join</Text>
            </TouchableOpacity>
        </View>
      ))}
        </View>
      </View>
    </View>
  );
};

export default App;