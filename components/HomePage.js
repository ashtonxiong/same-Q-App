import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabase";
import { useDeviceIdentifier } from "./deviceID";

const HomePage = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  // const [deviceIdentifier, setDeviceIdentifier] = useState('');

  const handleJoinPress = (course, deviceIdentifier) => {
    console.log(`Navigating to CoursePage with course: ${course.course}`);
    navigation.navigate("CoursePage", { course, deviceIdentifier });
  };

  const navigateToCollabPage = () => {
    console.log("device id in navigateToCollab:", deviceIdentifier);
    navigation.navigate("CollabPage", { deviceIdentifier });
  };

  const clickMenuModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [activeClasses, setActive] = useState([]);
  const [inactiveClasses, setInactive] = useState([]);

  const getActive = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-app-data")
        .select(
          "id, course, instructor, duration, num_active_students, num_questions"
        )
        .eq("status", "TRUE");

      if (data) {
        // Now 'data' is an array of objects with 'id' and 'course' columns
        const coursesArray = data.map((item) => ({
          id: item.id,
          course: item.course,
          instructor: item.instructor,
          duration: item.duration,
          num_students: item.num_active_students,
          num_questions: item.num_questions,
        }));

        setActive(coursesArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const getInactive = async () => {
    try {
      const { data, error } = await supabase
        .from("sameQ-app-data")
        .select(
          "id, course, instructor, duration, num_active_students, num_questions"
        )
        .eq("status", "FALSE");

      if (data) {
        // 'data' is an array of objects with 'id' and 'course' columns
        const coursesArray = data.map((item) => ({
          id: item.id,
          course: item.course,
          instructor: item.instructor,
          duration: item.duration,
          num_students: item.num_active_students,
          num_questions: item.num_questions,
        }));

        setInactive(coursesArray);
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    }
  };

  const deviceIdentifier = useDeviceIdentifier();

  useEffect(() => {
    // const generatedDeviceId = uuidv4();
    // setDeviceIdentifier(generatedDeviceId);

    getActive();
    getInactive();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Device identifier: {deviceIdentifier}</Text>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={clickMenuModal}>
          <View style={styles.backArrow}>
            <Icon name="menu" size={20} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.courseHeaderContainer}>
        <Text style={styles.pageHeader}>Courses</Text>
      </View>

      {/*  ------- active office hours --------- */}
      <View style={[styles.courseSection, { marginTop: "20%" }]}>
        <Text style={[styles.sectionHeader]}>Active Office Hours</Text>
        <View style={styles.courseContainer}>
          {activeClasses.map((course) => (
            <View key={course.id} style={styles.courseBox}>
              <Text style={styles.courseBoxTEXT}>{course.course}</Text>
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoinPress(course, deviceIdentifier)}
              >
                <Text style={styles.joinButtonTEXT}>Join</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {/*  ------- active office hours --------- */}

      {/* ------- inactive office hours --------- */}
      <View style={[styles.courseSection]}>
        <Text style={styles.sectionHeader}>Inactive Office Hours</Text>
        <View style={styles.courseContainer}>
          {inactiveClasses.map((course) => (
            <View key={course.id} style={styles.courseBox}>
              <Text style={styles.courseBoxTEXT}>{course.course}</Text>
              <TouchableOpacity
                style={styles.askButton}
                onPress={() => handleJoinPress(course, deviceIdentifier)}
              >
                <Text style={styles.askButtonTEXT}>Ask</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      {/*  -------inactive office hours --------- */}

      <Modal transparent={true} visible={isModalVisible}>
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
