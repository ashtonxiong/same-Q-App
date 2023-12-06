import { ScreenHeight } from "@freakycoder/react-native-helpers";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, Animated, Easing, TouchableOpacity } from "react-native";
const Pulse = require('react-native-pulse').default;
import FontIcon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");
const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width


const HuddleUI = ({ huddlers, isMuted, toggleMuted }) => {
  console.log('mute', isMuted)
  console.log('toggle:', toggleMuted)
  // const [isMuted, setMuted] = useState(true);

 const icons = [
    require("../assets/avatar.png"),
    require("../assets/avatar-2.png"),
    require("../assets/avatar-3.png"),
    require("../assets/avatar-4.png"),
    require("../assets/avatar-5.png"),
 ];


 const renderMic = () => (
  <TouchableOpacity onPress={toggleMuted} style={styles.icons}>
    <FontIcon
      name={isMuted ? "microphone-slash" : "microphone"}
      size={40}
    />
  </TouchableOpacity>
);


 const getRandomIcon = () => {
   const randomIndex = Math.floor(Math.random() * icons.length);
   return icons[randomIndex];
 };


 const huddlersArray = 
  huddlers !== null ? 
    huddlers.replace(/[{}]/g, "") // remove curly braces
              .split(",")
              .map((huddler) => huddler.trim()) // trim whitespace
  : ["You"];


  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.circleContainer}>
          {huddlersArray.map((huddler, index) => (
            <View key={index} style={styles.circle}>
              <Pulse
                color='indigo'
                numPulses={3}
                diameter={150}
                speed={25}
                duration={2000}
                style={styles.pulse}
              />
              <Image
                source={getRandomIcon()}
                style={styles.collaboratorIcon}

              />
              <Text style={styles.collaboratorName}>{huddler || "You"}</Text>
            </View>
          ))}
        </View>
        <View style={styles.icons}>
          {renderMic()}
        </View>
      </View>
        <View style={styles.leaveButtonContainer}>
          <TouchableOpacity style={styles.leaveButton}>
            <Text style={styles.leaveButtonText}>Leave Huddle</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
  main: {
    flex: 1, 
    justifyContent: 'center',
  },
  container: {
    flex: 1, 
    alignItems: "center",
    justifyContent: 'center',
    alignContent: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    margin: '5%', // adjust spacing between circles
    alignItems: "center",
    justifyContent: 'center',
    width: 100, // aajust width of each circle
  },
  pulse: {
    position: 'absolute',
    alignSelf: 'center',
  },
  collaboratorIcon: {
    width: 50,
    height: 50,
  },
  collaboratorName: {
    fontSize: scaleFactor * 15,
    marginTop: '5%',
  },
  icons: {
    margin: '5%',
    alignItems: 'center',
    marginTop: '10%'
  },
  leaveButtonContainer: {
    alignItems: 'center',
  },
  leaveButton: {
    borderRadius: 20,
    backgroundColor: "#5E42A6",
    padding: 10,
    width: "50%", 
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  leaveButtonText: {
    color: "white",
    fontSize: 20 * scaleFactor,
    fontWeight: "bold",
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
});

export default HuddleUI;