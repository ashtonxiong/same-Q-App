import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const activeCourses = [
  { id: '1', name: 'CS 147' },
  { id: '2', name: 'ENGLISH 9CE' },
];

const inactiveCourses = [
  { id: '3', name: 'CS 161' },
];

const HomePage = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleJoinPress = (course) => {
    console.log(`Navigating to CoursePage with course: ${course.name}`);
    navigation.navigate('CoursePage', { course });
  };

  const clickMenuModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={clickMenuModal}>
          <View style={styles.backArrow}>
            <Icon name="menu" size={20} color="#000" />
          </View>
        </TouchableOpacity>
        <Text style={styles.pageHeader}>Courses</Text>
      </View>
      
        
      
      {/*  ------- active office hours --------- */}
      <View style={[styles.courseSection, { marginTop: '10%' }]}>
        <Text style={styles.sectionHeader}>Active Office Hours</Text>
        <View style={styles.courseContainer}>
          {activeCourses.map((course) => (
            <View key={course.id} style={styles.courseBox}>
              <Text style={styles.courseBoxTEXT}>{course.name}</Text>
              <TouchableOpacity
                style={styles.queueButton}
                onPress={() => handleJoinPress(course)}
              >
                <Text style={styles.askButtonTEXT}>Join</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {/*  ------- active office hours --------- */}

      {/*  ------- inactive office hours --------- */}
      <View style={[styles.courseSection]}>
        <Text style={styles.sectionHeader}>Inactive Office Hours</Text>
        <View style={styles.courseContainer}>
          {inactiveCourses.map((course) => (
            <View key={course.id} style={[styles.courseBox]}>
              <Text style={styles.courseBoxTEXT}>{course.name}</Text>
              <TouchableOpacity
                style={styles.queueButton}
                onPress={() => handleJoinPress(course)}
              >
                <Text style={styles.askButtonTEXT}>Ask</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {/*  -------inactive office hours --------- */}

      <Modal
        transparent={true}
        visible={isModalVisible}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.menuModalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.menuModalContent}>
                <Text style={styles.menuModalTEXT}>TEST</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HomePage;
