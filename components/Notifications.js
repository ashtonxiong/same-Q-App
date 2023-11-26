import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomBar from './BottomBar';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Notifications = () => {
    const navigation = useNavigation();

    const handleJoinPress = (course) => {
      navigation.navigate('CoursePage', { course });
    };  

  return (
    <View style={styles.NotiContainer}>
        <View style={styles.NotificationInfo}>
          <Icon name="people" size={'55%'} color={"#000"} style={styles.NotiIcon} />
          <Text style={styles.NotiText}> Amy L., Jackson D, Rebecca C, and 1 other joined 
          “How do I upload files to AFS directory?” with you. </Text>
        </View>

        <View style={styles.NotificationInfo}>
          <Icon name="earphones" size={'50%'} color={"#000"} style={styles.NotiIcon} />
          <Text style={styles.NotiText}> Tony S. joined the huddle for “How do I calculate the trajectory of the
          rocket?” with you. </Text>
        </View>

        <View style={styles.NotificationInfo}>
          <Icon name="people" size={'55%'} color={"#000"} style={styles.NotiIcon} />
          <Text style={styles.NotiText}> Mia B. joined the huddle for “How do I upload 
          files to AFS directory?” </Text>
        </View>

        <View style={styles.NotificationInfo}>
          <Icon name="earphones" size={'50%'} color={"#000"} style={styles.NotiIcon} />
          <Text style={styles.NotiText}> Michael S., Jim H, Dwight S, and 1 other joined 
          “How to approach greedy algorithms” with you. </Text>
        </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pageHeader: {
//     fontSize: 40,
//     marginTop: 90,
//     fontWeight: 'bold',
//   },
//   courseSection: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//   },
//   bottomSection: {
//     justifyContent: 'flex-end',
//     marginBottom: 200, // adjust space from bottom of screen
//   },
//   sectionHeader: {
//     color: 'black',
//     fontSize: 30,
//     fontWeight: 'normal',
//     marginTop: 30, // adjust space from 'Courses' header
//   },
//   courseContainer: {
//     marginTop: 5,
//   },
//   courseBox: {
//     flexDirection: 'row', // have course name and join button in one row
//     padding: 30,
//     margin: 10,
//     width: 320,
//     borderWidth: 2,
//     borderColor: '#000',
//     borderRadius: 20,
//     backgroundColor: '#b986ee',
//     justifyContent: 'space-between', // align items along the row
//   },
//   courseBoxTEXT: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//     textAlign: 'left',
//   },
//   joinButton: {
//     width: 70,
//     borderRadius: 20,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   joinButtonTEXT: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   askButton: {
//     width: 70,
//     borderRadius: 20,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   askButtonTEXT: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
// });

export default Notifications;
