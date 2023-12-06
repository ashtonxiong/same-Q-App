import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Dimensions, Animated, Easing } from "react-native";


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


 const huddlersArray = 
  huddlers !== null ? 
    huddlers.replace(/[{}]/g, "") // remove curly braces
              .split(",")
              .map((huddler) => huddler.trim()) // trim whitespace
  : ["You"];


   const PulseAnimation = ({ position }) => {
    const pulseValue = useRef(new Animated.Value(0)).current;

    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    useEffect(() => {
      pulse();
    }, []);

    return (
      <Animated.View
        style={{
          borderWidth: 3,
          borderColor: 'red',
          position: "absolute",
          top: position.y,
          left: position.x,
          width: 70,
          height: 70,
          borderRadius: 45,
          backgroundColor: "#B74E91", // Adjust color and opacity as needed
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          transform: [{ scale: pulseValue }],
        }}
      />
    );
  };


  return (
    <View style={styles.main}>
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
              <PulseAnimation position={position} />
              <Image
                source={getRandomIcon()}
                style={[
                  styles.collaboratorIcon,
                  {
                    position: "absolute",
                    top: position.y + 10, // Adjust the values as needed
                    left: position.x + 10, // Adjust the values as needed
                  },
                ]}
              />
              <Text style={styles.collaboratorName}>{huddler || "You"}</Text>
            </View>
          );
        })}
      </View>
    </View>
    </View>
  );
};


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
  main: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
   container: {
     alignItems: "center",
     justifyContent: 'center',
     alignContent: 'center'
   },
   circleContainer: {
    // borderWidth: 1,
     position: "relative",
     marginTop: 100,
     alignItems: "center",
     justifyContent: "center",
     transform: [{ translateX: screenWidth * 0.38}], // center horizontally?
   },
   circle: {
     position: "absolute",
     alignItems: "center",
     alignContent: "center",
     transform: [{ translateY: screenHeight * 0. }],
     justifyContent: 'center',
   },
   collaboratorIcon: {
     width: 50,
     height: 50,
     borderRadius: 25,
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