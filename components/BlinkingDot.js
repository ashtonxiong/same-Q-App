import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const BlinkingDot = ({ inHuddle }) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Define the animation
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );

    // Start or stop the animation based on inHuddle value
    if (inHuddle) {
      blinkAnimation.start();
    } else {
      blinkAnimation.stop();
      opacity.setValue(1); // Reset opacity when not in huddle
    }

    // Cleanup on component unmount
    return () => blinkAnimation.stop();
  }, [inHuddle, opacity]);

  return (
    <Animated.View
      style={{
        width: 20,
        height: 20,
        backgroundColor: 'red', // or any color you prefer
        borderRadius: 20,
        opacity,
      }}
    />
  );
};

export default BlinkingDot;
