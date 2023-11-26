import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CollabPage = () => {
    const navigation = useNavigation();

    const numCourses = {
      courses: ["CS147", "ENGLISH 9CE", "CS161"],
      numQuestions: '5',
    }

    const handleJoinPress = (course) => {
      navigation.navigate('CoursePage', { course });
    };  

  return (
    <View style={styles.NotiContainer}>
        <View style={styles.collabHeader}>
          <Text style={styles.courseBoxTEXT}> Collaborating </Text>
          <Text> Collaborating on {numCourses.numQuestions} questions</Text>
        </View>

        <View style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <Icon name="people" size="20%" style={styles.collabPeopleIcon} />
            <Text style={{ fontSize: 20, marginLeft: "5%", marginRight: "5%"}} >Expected Help at 2:15</Text>
            <Icon style={styles.collabEarphone} name="earphones" size="20%"/>
          </View>

          {/* middle row */}
          <View style={styles.collabTopRow}>
            <Text>Middle</Text>
          </View>

          {/* bottom row */}
          <View style={styles.collabTopRow}>
            <Text>Collaborate </Text>
          </View>
        </View>
    </View>
  );
};

export default CollabPage;
