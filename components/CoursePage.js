import React, {useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';



const CoursePage = ({ route }) => {
  const { course } = route.params;

  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');
  const scaleFactor = Math.min(width, height) / 375; // Adjust 375 based on your design reference width

  const [times, setTimes] = useState([
    { numPeople: 2, time: "2:15", earphone: 0, text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 1 },
    { numPeople: 1, time: "2:30", earphone: 2, text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 2 },
    { numPeople: 2, time: "2:15", earphone: 0, text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 3 },
    { numPeople: 2, time: "2:15", earphone: 0, text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 4 },
    { numPeople: 1, time: "2:30", earphone: 2, text: "How do I add audio and a pulsing effect to the medium-fi prototype?", id: 5 },
  ]);

  const handleCollabPress = (questionText) => {
    // navigate to QuestionPage with the question parameter
    console.log(`Navigating to QuestionPage with question: ${questionText}`);
    navigation.navigate('QuestionPage', { question: questionText, course });
  };  

  const handleBackHome = (home) => {
    // navigate back to HomePage
    console.log(`Navigating to HomePage`);
    navigation.navigate('HomePage');
  };  

  return (
    <View style={styles.container}>

      {/* <View style={styles.appBar}>
        <TouchableOpacity
          onPress={handleBackHome}>
        <View style={styles.backArrow}>
          <Icon name="arrow-left" size={20} color="#000"/>
          <Text style={styles.backTEXT}>Home</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.className}>
          <Text style={styles.classNameText}> CLASS NAME </Text>
        </View>
      </View> */}

      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={handleBackHome}>
          <View style={styles.backArrow}>
          <Icon name="arrow-left" size={20} color="#000"/>
          <Text style={styles.backTEXT}>Home</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.headerContainer}>
          <Text style={styles.classNameText}>
            LOGO
          </Text>
        </View> */}
      </View>

      <View>

        <View style={styles.classInfo}>
          <View style={styles.courseHeaderContainer}>
            <Text style={styles.pageHeader}>
              {course.name}
            </Text>
          </View>

          <View style={styles.courseDetails}>
            <View style={styles.courseDetailTop}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Instructor: </Text>
                <Text> Instructor Name </Text>
              </View>
              <Text style={{marginLeft: 'auto'}}> TEMP</Text>
            </View>
            <View style={styles.courseDetailBottom}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Duration: </Text>
                <Text> Duration Time </Text>
              </View>
              <Text style={{marginLeft: 'auto'}}> TEMP</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.sectionHeader}>Queue</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* <View style={styles.questionBox}>
            <Text style={styles.questionTEXT}>FIRST TWO LINES OF QUESTION</Text>
              <TouchableOpacity
              style={styles.courseCollabButton}
              onPress={() => handleCollabPress('FIRST TWO LINES OF QUESTION')}>
                <Text style={styles.courseCollabButtonText}>Collaborate</Text>
            </TouchableOpacity>
          </View> */}

          {times.map(time => (
            <View key={time.id} style={styles.queueBox}>
            {/* top row */}
            <View style={styles.queueTopRow}>
              <View style={styles.queuePeopleIcon} >
                <Text style={{fontSize: 17 * scaleFactor, fontWeight: 'bold'}}>{time.numPeople}</Text>
                <Icon name="people" size={20 * scaleFactor} />
              </View>
              <Text style={{ fontSize: 20 + scaleFactor, marginLeft: 5 * scaleFactor, marginRight: 5 * scaleFactor}} >Expected Help at <Text style={{fontWeight: 'bold'}}>{time.time}</Text></Text>
              <View style={styles.queueEarphone}>
                <Icon  name="earphones" size={20 * scaleFactor} />
                <Text style={{fontSize: 20 * scaleFactor, fontWeight: 'bold', marginLeft: 3}}>{time.earphone}</Text>
              </View>
            </View>

            {/* middle row */}
            <View style={styles.queueMid}>
              <Text style={{fontSize: 17 * scaleFactor, color: '#000000'}}>{time.text}</Text>
            </View>

            {/* bottom row */}
            <View style={styles.queueBot}>
            <TouchableOpacity
              style={styles.queueButton}
              onPress={() => handleCollabPress("CS 147")}
            >
              <Text style={styles.queueButtonText}> Collaborate </Text>
            </TouchableOpacity>
            </View>
        </View>
))}

        </ScrollView>
      </View>
    </View>
  );
};

export default CoursePage;
