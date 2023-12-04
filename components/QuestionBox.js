import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const screenWidth = Dimensions.get('window').width;

const pageStyles = StyleSheet.create({
    questionBox: {
        padding: 10,
        margin: 10,
        width: screenWidth * 0.95,
        height: 100,
        borderWidth: 2,
        borderColor: '#9F6FDD',
        borderRadius: 20,
      },
      questionTEXT: {
        fontSize: 17,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 5
      },
      courseCollabButton: {
        width: 145,
        borderRadius: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      courseCollabButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      }
});

const QuestionBox = ({ data }) => {
    return (
        <View>
            <Text style={{color: 'black'}}>Test</Text>
        </View>
    //     <View key={time.id} style={styles.queueBox}>

    //     {/* top row */}
    //     <View style={styles.queueTopRow}>
    //         <View style={styles.queuePeopleIcon} >
    //         <Text style={{fontSize: 17 * scaleFactor, fontWeight: 'bold'}}>{time.numPeople}</Text>
    //         <Icon name="people" size={20 * scaleFactor} />
    //         </View>
    //         <Text style={{ fontSize: 20 + scaleFactor, marginLeft: 5 * scaleFactor, marginRight: 5 * scaleFactor}} >Expected Help at <Text style={{fontWeight: 'bold'}}>{time.time}</Text></Text>
    //         <View style={styles.queueEarphone}>
    //         <Icon  name="earphones" size={20 * scaleFactor} />
    //         <Text style={{fontSize: 20 * scaleFactor, fontWeight: 'bold', marginLeft: 3}}>{time.earphone}</Text>
    //         </View>
    //     </View>

    //     {/* middle row */}
    //     <View style={styles.queueMid}>
    //         <Text style={{fontSize: 17 * scaleFactor, color: '#000000'}}>{time.text}</Text>
    //     </View>

    //     {/* bottom row */}
    //     <View style={styles.queueBot}>
    //     <TouchableOpacity
    //         style={styles.button}
    //         onPress={() => handleCollabPress(time)}
    //     >
    //         <Text style={styles.buttonText}> Collaborate </Text>
    //     </TouchableOpacity>
    //     </View>
    // </View>

    );
  };

export default QuestionBox;

