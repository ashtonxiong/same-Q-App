import React, { useState, useEffect } from "react";
import {
 Text,
 View,
 Image,
 TouchableOpacity,
 Modal,
 TouchableWithoutFeedback,
 ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import "react-native-get-random-values";
import { supabase } from "../supabase";
import { useDeviceIdentifier } from "./deviceID";

const HomePage = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleJoinPress = (course, deviceIdentifier) => {
    //  console.log(`Navigating to CoursePage with course: ${course.course}`);
    navigation.navigate("CoursePage", { course, deviceIdentifier });
  };

  const navigateToCollabPage = () => {
    //  console.log("device id in navigateToCollab:", deviceIdentifier);
    navigation.navigate("CollabPage", { deviceIdentifier });
  };

  const handleFakePagePress = (prevPage) => {
    console.log(`Navigating to Filler Page`);
    navigation.navigate("FillerPage", { prevPage });
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
    getActive();
    getInactive();
  }, []);


 return (
   <View style={styles.container}>
    <ImageBackground style={styles.container} source={require('../assets/gradient.png')} resizeMode="cover">
     {/* <Text>Device identifier: {deviceIdentifier}</Text> */}
     <View style={styles.appBarHome}>
       <TouchableOpacity onPress={clickMenuModal}>
         <View style={styles.backArrow}>
           <Icon name="menu" size={20} color="white" />
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
               activeOpacity={0.7}
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
                <View style={styles.menuModalTop}>
                  <Image
                    style={styles.menuModalImage}
                    source={require("../assets/avatar-2.png")}
                  />
                  <Text style={styles.menuModalHeader}>Welcome, Emma!</Text>
                </View>

              <View style={styles.menuModalBottom}>

              <TouchableOpacity onPress={() => { closeModal(); handleFakePagePress("HomePage"); }} style={styles.fakePage}>
                <Icon name="user" size={30} color="white" />
                <Text style={styles.menuModalBody}> Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { closeModal(); handleFakePagePress("HomePage"); }} style={styles.fakePage}>
                <Icon name="heart" size={30} color="white" />
                <Text style={styles.menuModalBody}> Most Frequently Collaborateed</Text>
              </TouchableOpacity>

                <TouchableOpacity onPress={() => { closeModal(); handleFakePagePress("HomePage"); }} style={styles.fakePage}>
                  <Image style={styles.canvasImage} source={require("../assets/canvas_white.png")} />
                  <Text style={styles.menuModalBody}> Canvas</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.logoutButtonContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => { closeModal(); handleFakePagePress("HomePage"); }}>
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>

             </View>
           </TouchableWithoutFeedback>
         </View>
       </TouchableWithoutFeedback>
     </Modal>
     </ImageBackground>
   </View>
 );
};

export default HomePage;
