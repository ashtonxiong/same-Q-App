import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";


const HuddleUI = ({ huddlers }) => {
 const icons = [
    require("../assets/avatar.png"),
    require("../assets/avatar-2.png"),
    require("../assets/avatar-3.png"),
    require("../assets/avatar-4.png"),
    require("../assets/avatar-5.png"),
 ];


 const calculatePosition = (index, total) => {
   const angle = (2 * Math.PI * index) / total;
   const radius = 80; // spacing the icons
   const x = radius * Math.sin(angle);
   const y = radius * Math.cos(angle);
   return { x, y };
 };


 const getRandomIcon = () => {
   const randomIndex = Math.floor(Math.random() * icons.length);
   return icons[randomIndex];
 };


 //  convert huddlers string into array
 const huddlersArray = huddlers
   .replace(/[{}]/g, "") // remove curly braces
   .split(",")
   .map((huddler) => huddler.trim()); // trim whitespace


 return (
   <View style={styles.container}>
     {/* <Text style={styles.headerText}>Huddle</Text> */}
     <View style={styles.circleContainer}>
       {huddlersArray.map((huddler, index) => {
         const position = calculatePosition(index, huddlersArray.length);
         return (
           <View
             key={index}
             style={[
               styles.circle,
               {
                 top: position.y,
                 left: position.x,
               },
             ]}
           >
             <Image source={getRandomIcon()} style={styles.collaboratorIcon} />
             <Text style={styles.collaboratorName}>{huddler || "You"}</Text>
           </View>
         );
       })}
     </View>
   </View>
 );
};


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
   container: {
     alignItems: "center",
   },
   circleContainer: {
     position: "relative",
     marginTop: 100,
     alignItems: "center",
     justifyContent: "center",
     transform: [{ translateX: screenWidth * 0.38}] // center horizontally?
   },
   circle: {
     position: "absolute",
     alignItems: "center",
     alignContent: "center",
   //   transform: [{ translateX: 110 }],
   },
   collaboratorIcon: {
     width: 50,
     height: 50,
     borderRadius: 25,
     borderColor: 'blue',
   },
   collaboratorName: {
     fontSize: 12,
     marginTop: 4,
   },
   headerText: {
     fontSize: 20,
     fontWeight: "bold",
     marginBottom: 8,
   },
 });


export default HuddleUI;