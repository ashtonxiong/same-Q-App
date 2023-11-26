import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CollabPage = () => {
    const navigation = useNavigation();

    const numCourses = {
      courses: ["CS147", "ENGLISH 9CE", "CS161"],
      numQuestions: '5',
    }

    const handleJoinPress = (course) => {
      navigation.navigate('CoursePage', { course });
    };  

  return (
    <View style={styles.NotiContainer}>
        <View style={styles.collabHeader}>
          <Text style={styles.courseBoxTEXT}> Collaborating </Text>
          <Text> Collaborating on {numCourses.numQuestions} questions</Text>
        </View>

        {/* --------- FIRST BUTTON -------- */}

        <View style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <View style={styles.collabPeopleIcon} >
              <Text style={{fontSize: '17%', fontWeight: 'bold'}}>2</Text>
              <Icon name="people" size="20%" />
            </View>
            <Text style={{ fontSize: '20%', marginLeft: "5%", marginRight: "5%"}} >Expected Help at <Text style={{fontWeight: 'bold'}}>2:15</Text></Text>
            <View style={styles.collabEarphone}>
              <Icon  name="earphones" size="20%"/>
              <Text style={{fontSize: '17%', fontWeight: 'bold', marginLeft: 3}}>0</Text>
            </View>
          </View>

          {/* middle row */}
          <View style={styles.collabMid}>
            <Text style={{fontSize: '17%', color: '#000000'}}>How do I add audio and a pulsing effect to the medium-fi prototype?</Text>
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

        {/* --------- FIRST BUTTON -------- */}

        {/* --------- SECOND BUTTON -------- */}

        <View style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <View style={styles.collabPeopleIcon} >
              <Text style={{fontSize: '17%', fontWeight: 'bold'}}>1</Text>
              <Icon name="people" size="20%" />
            </View>
            <Text style={{ fontSize: '20%', marginLeft: "5%", marginRight: "5%"}} >Expected Help at <Text style={{fontWeight: 'bold'}}>2:25</Text></Text>
            <View style={styles.collabEarphone}>
              <Icon  name="earphones" size="20%"/>
              <Text style={{fontSize: '17%', fontWeight: 'bold', marginLeft: 3}}>1</Text>
            </View>
          </View>

          {/* middle row */}
          <View style={styles.collabMid}>
            <Text style={{fontSize: '17%', color: '#000000'}}>How do I add relative links to the Hi-Fidelity Prototype?</Text>
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
        {/* --------- SECOND BUTTON -------- */}

        <View style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <View style={styles.collabPeopleIcon} >
              <Text style={{fontSize: '17%', fontWeight: 'bold'}}>3</Text>
              <Icon name="people" size="20%" />
            </View>
            <Text style={{ fontSize: '20%', marginLeft: "5%", marginRight: "5%"}} >Expected Help at <Text style={{fontWeight: 'bold'}}>2:35</Text></Text>
            <View style={styles.collabEarphone}>
              <Icon  name="earphones" size="20%"/>
              <Text style={{fontSize: '17%', fontWeight: 'bold', marginLeft: 3}}>2</Text>
            </View>
          </View>

          {/* middle row */}
          <View style={styles.collabMid}>
            <Text style={{fontSize: '17%', color: '#000000'}}>How do I upload the website files to the AFS Directory?</Text>
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

        <View style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <View style={styles.collabPeopleIcon} >
              <Text style={{fontSize: '17%', fontWeight: 'bold'}}>2</Text>
              <Icon name="people" size="20%" />
            </View>
            <Text style={{ fontSize: '20%', marginLeft: "5%", marginRight: "5%"}} >Expected Help at <Text style={{fontWeight: 'bold'}}>2:15</Text></Text>
            <View style={styles.collabEarphone}>
              <Icon  name="earphones" size="20%"/>
              <Text style={{fontSize: '17%', fontWeight: 'bold', marginLeft: 3}}>0</Text>
            </View>
          </View>

          {/* middle row */}
          <View style={styles.collabMid}>
            <Text style={{fontSize: '17%', color: '#000000'}}>How do I add audio and a pulsing effect to the medium-fi prototype?</Text>
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

        <View style={styles.collabBox}>
          {/* top row */}
          <View style={styles.collabTopRow}>
            <View style={styles.collabPeopleIcon} >
              <Text style={{fontSize: '17%', fontWeight: 'bold'}}>2</Text>
              <Icon name="people" size="20%" />
            </View>
            <Text style={{ fontSize: '20%', marginLeft: "5%", marginRight: "5%"}} >Expected Help at <Text style={{fontWeight: 'bold'}}>2:15</Text></Text>
            <View style={styles.collabEarphone}>
              <Icon  name="earphones" size="20%"/>
              <Text style={{fontSize: '17%', fontWeight: 'bold', marginLeft: 3}}>0</Text>
            </View>
          </View>

          {/* middle row */}
          <View style={styles.collabMid}>
            <Text style={{fontSize: '17%', color: '#000000'}}>How do I add audio and a pulsing effect to the medium-fi prototype?</Text>
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

        
    </View>
  );
};

export default CollabPage;
