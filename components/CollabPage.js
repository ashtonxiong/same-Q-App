import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CollabPage = () => {
    const navigation = useNavigation();

    const handleJoinPress = (course) => {
      navigation.navigate('CoursePage', { course });
    };  

  return (
    <View style={styles.NotiContainer}>
        <View style={styles.NotificationInfo}>
          <Icon name="people" size={'55%'} color={"#000"} style={styles.NotiIcon} />
          <Text style={styles.NotiText}> TEST TEST</Text>
        </View>
    </View>
  );
};

export default CollabPage;
