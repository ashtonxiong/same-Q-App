import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const activeCourses = [
    { id: '1', name: 'CS 147' },
    { id: '2', name: 'ENGLISH 9CE' },
  ];

const inactiveCourses = [
    { id: '3', name: 'CS 161' },
  ];

const App = () => {
    const navigation = useNavigation();

    const handleJoinPress = (course) => {
      // navigate to CoursePage with the courseName parameter
      navigation.navigate('CoursePage', { course });
    };  

    const handleTestButton = (noti) => {
      navigation.navigate('Notifications', { noti });
    };  

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>Courses</Text>
      {/* active office hours */}
      <View style={styles.courseSection}>
        <Text style={styles.sectionHeader}>Active Office Hours</Text>
        <View style={styles.courseContainer}>

          {/* <View style={styles.courseBox}>
            <Text style={styles.courseBoxTEXT}>CS 147</Text>
            <View style={styles.joinButton}>
              <Text style={styles.joinButtonTEXT}>Join</Text>
            </View>
          </View> */}
        {/* <View style={styles.courseBox}>
            <Text style={styles.courseBoxTEXT}>CS 147</Text>
            <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinPress('CS 147')}>
            <Text style={styles.joinButtonTEXT}>Join</Text>
            </TouchableOpacity>
        </View>
          <View style={styles.courseBox}>
            <Text style={styles.courseBoxTEXT}>ENGLISH 9CE</Text>
            <View style={styles.joinButton}>
              <Text style={styles.joinButtonTEXT}>Join</Text>
            </View>
          </View> */}

      {activeCourses.map((course) => (
        <View key={course.id} style={styles.courseBox}>
          <Text style={styles.courseBoxTEXT}>{course.name}</Text>
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleJoinPress(course)}
          >
            <Text style={styles.joinButtonTEXT}>Join</Text>
          </TouchableOpacity>
        </View>
      ))}
          
        </View>
      </View>

      {/* inactive office hours */}
      <View style={[styles.courseSection, styles.bottomSection]}>
        <Text style={styles.sectionHeader}>Inactive Office Hours</Text>
        <View style={styles.courseContainer}>
            
          {/* <View style={styles.courseBox}>
            <Text style={styles.courseBoxTEXT}>CS 161</Text>
            <View style={styles.askButton}>
              <Text style={styles.askButtonTEXT}>Ask</Text>
            </View>
          </View> */}

        {inactiveCourses.map((course) => (
            <View key={course.id} style={styles.courseBox}>
            <Text style={styles.courseBoxTEXT}>{course.name}</Text>
            <TouchableOpacity
                style={styles.askButton}
                onPress={() => handleJoinPress(course)}
            >
                <Text style={styles.askButtonTEXT}>Join</Text>
            </TouchableOpacity>
        </View>
      ))}

      
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => handleTestButton('Notifications')}
          >
            <Text>Test</Text>
          </TouchableOpacity>
      


        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageHeader: {
    fontSize: 40,
    marginTop: 90,
    fontWeight: 'bold',
  },
  courseSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  bottomSection: {
    justifyContent: 'flex-end',
    marginBottom: 200, // adjust space from bottom of screen
  },
  sectionHeader: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'normal',
    marginTop: 30, // adjust space from 'Courses' header
  },
  courseContainer: {
    marginTop: 5,
  },
  courseBox: {
    flexDirection: 'row', // have course name and join button in one row
    padding: 30,
    margin: 10,
    width: 320,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 20,
    backgroundColor: '#b986ee',
    justifyContent: 'space-between', // align items along the row
  },
  courseBoxTEXT: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  joinButton: {
    width: 70,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonTEXT: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  askButton: {
    width: 70,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  askButtonTEXT: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
