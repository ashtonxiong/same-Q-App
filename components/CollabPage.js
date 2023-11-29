import React, {useRef, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CollabPage = () => {
    const [pages, setPages] = useState([
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 1},
      {numPeople: 1, time: "2:30", earphone: 2,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 2},
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 3},
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 4},
      {numPeople: 2, time: "2:15", earphone: 0,
      text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 5}
      
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

    const { width, height } = Dimensions.get('window');
    const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width
    
  


  return (
    <View style={styles.collabContainer}>
    <ScrollView 
    // ref={scrollViewRef}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ alignItems: 'center', borderBlockColor: "red", border: 5 }}
    >        
    <View style={styles.collabHeader}>
      <Text style={styles.courseBoxTEXT}> Collaborating </Text>
      <Text> Collaborating on {numCourses.numQuestions} questions</Text>
    </View>
      {pages.map(page => (
          <View key={page.id} style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <View style={styles.collabPeopleIcon} >
              <Text style={{fontSize: 17 * scaleFactor, fontWeight: 'bold'}}>{page.numPeople}</Text>
              <Icon name="people" size={20 * scaleFactor} />
            </View>
            <Text style={{ fontSize: 20 + scaleFactor, marginLeft: 5 * scaleFactor, marginRight: 5 * scaleFactor}} >Expected Help at <Text style={{fontWeight: 'bold'}}>{page.time}</Text></Text>
            <View style={styles.collabEarphone}>
              <Icon  name="earphones" size={20 * scaleFactor} />
              <Text style={{fontSize: 20 * scaleFactor, fontWeight: 'bold', marginLeft: 3}}>{page.earphone}</Text>
            </View>
          </View>

          {/* middle row */}
          <View style={styles.collabMid}>
            <Text style={{fontSize: 17 * scaleFactor, color: '#000000'}}>{page.text}</Text>
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
