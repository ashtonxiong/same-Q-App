

Notifications 
import React from "react";
import {
 StyleSheet,
 Dimensions,
 Text,
 View,
 TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./BottomBar";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";


const Notifications = () => {
 const navigation = useNavigation();


 const handleJoinPress = (course) => {
   navigation.navigate("CoursePage", { course });
 };
 const { width, height } = Dimensions.get("window");
 const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width


 return (
   <View style={styles.NotiContainer}>
     <View>
       <Text style={styles.courseBoxTEXT}> Notifications </Text>
     </View>
     <View style={styles.NotificationInfo}>
       <Icon
         name="people"
         size={55 * scaleFactor}
         color={"#000"}
         style={styles.NotiIcon}
       />
       <Text style={styles.NotiText}>
         {" "}
         Amy L., Jackson D, Rebecca C, and 1 other joined “How do I upload
         files to AFS directory?” with you.{" "}
       </Text>
     </View>


     <View style={styles.NotificationInfo}>
       <Icon
         name="earphones"
         size={50 * scaleFactor}
         color={"#000"}
         style={styles.NotiIcon}
       />
       <Text style={styles.NotiText}>
         {" "}
         Tony S. joined the huddle for “How do I calculate the trajectory of
         the rocket?” with you.{" "}
       </Text>
     </View>


     <View style={styles.NotificationInfo}>
       <Icon
         name="people"
         size={55 * scaleFactor}
         color={"#000"}
         style={styles.NotiIcon}
       />
       <Text style={styles.NotiText}>
         {" "}
         Mia B. joined the huddle for “How do I upload files to AFS directory?”{" "}
       </Text>
     </View>


     <View style={styles.NotificationInfo}>
       <Icon
         name="earphones"
         size={50 * scaleFactor}
         color={"#000"}
         style={styles.NotiIcon}
       />
       <Text style={styles.NotiText}>
         {" "}
         Michael S., Jim H, Dwight S, and 1 other joined “How to approach
         greedy algorithms” with you.{" "}
       </Text>
     </View>
   </View>
 );
};


export default Notifications;
