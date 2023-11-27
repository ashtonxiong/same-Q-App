import React, {useRef, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CollabPage = () => {
    const [pages, setPages] = useState([
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?"},
      {numPeople: 1, time: "2:30", earphone: 2,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?"},
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?"},
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?"},
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?"}
      
    ])

    const navigation = useNavigation();

    const numCourses = {
      courses: ["CS147", "ENGLISH 9CE", "CS161"],
      numQuestions: '5',
    }

    const handleJoinPress = (course) => {
      navigation.navigate('CoursePage', { course });
    };  

    const scrollViewRef = useRef(null); // Create a ref for the ScrollView

    const scrollToBottom = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };
  


  return (
    <View style={styles.collabContainer}>
    <ScrollView 
    // ref={scrollViewRef}
    contentContainerStyle={{ alignItems: 'center', borderBlockColor: "red", border: 5 }}
    >        
    <View style={styles.collabHeader}>
      <Text style={styles.courseBoxTEXT}> Collaborating </Text>
      <Text> Collaborating on {numCourses.numQuestions} questions</Text>
    </View>
      {pages.map(page => (
          <View style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <View style={styles.collabPeopleIcon} >
              <Text style={{fontSize: '17%', fontWeight: 'bold'}}>{page.numPeople}</Text>
              <Icon name="people" size="20%" />
            </View>
            <Text style={{ fontSize: '20%', marginLeft: "5%", marginRight: "5%"}} >Expected Help at <Text style={{fontWeight: 'bold'}}>{page.time}</Text></Text>
            <View style={styles.collabEarphone}>
              <Icon  name="earphones" size="20%"/>
              <Text style={{fontSize: '17%', fontWeight: 'bold', marginLeft: 3}}>{page.earphone}</Text>
            </View>
          </View>

          {/* middle row */}
          <View style={styles.collabMid}>
            <Text style={{fontSize: '17%', color: '#000000'}}>{page.text}</Text>
          </View>

          {/* bottom row */}
          <View style={styles.collabBot}>
          <TouchableOpacity
            style={styles.collabButton}
            onPress={() => handleJoinPress("CS 147")}
          >
            <Text style={styles.collabButtonText}> Collaborating </Text>
          </TouchableOpacity>
          </View>
        </View>
))}
        
        
    </ScrollView>
    </View>

  );
};

export default CollabPage;
