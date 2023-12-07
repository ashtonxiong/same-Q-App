

Notifications 
import React from "react";
import {
 Dimensions,
 Text,
 View,
 ImageBackground
} 
from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "./BottomBar";
import styles from "../styles";
import Icon from "react-native-vector-icons/SimpleLineIcons";


const Notifications = () => {
 const navigation = useNavigation();

 const { width, height } = Dimensions.get("window");
 const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width


 return (
   <View style={styles.NotiContainer}>
    <ImageBackground style={styles.container} source={require('../assets/gradient.png')} resizeMode="cover">
      <View style={styles.appBar}></View>
            <View style={styles.courseHeaderContainer}>
                <Text style={styles.pageHeader}>Notifications</Text>
            </View>

     <View style={styles.NotificationInfo}>
       <Icon
         name="people"
         size={55 * scaleFactor}
         color={"white"}
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
         color={"white"}
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
         color={"white"}
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
         color={"white"}
         style={styles.NotiIcon}
       />
       <Text style={styles.NotiText}>
         {" "}
         Michael S., Jim H, Dwight S, and 1 other joined “How to approach
         greedy algorithms” with you.{" "}
       </Text>
     </View>
     </ImageBackground>
   </View>
 );
};


export default Notifications;
