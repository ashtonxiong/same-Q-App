import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles';
import defaults from '../globalConstants'



const QuestionPage = ({ route }) => {

    const { question } = route.params;
    const helpTime = "2:15 PM";
    const questionMembers = "2";
    const activeInHuddle = "0";

    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} style={styles.questionContainer}>
            <View style={styles.topBlock}>
                <View style={styles.pageHeader}>
                    <Text style={styles.courseBoxTEXT}>CS147</Text>
                </View>
                <View style={styles.QuestionInfo}>
                    <Text style={styles.QuestionInfoText}>{question} </Text>
                    <Text style={styles.questionHelpTimeText}>Scheduled for {helpTime}</Text>
                    <View style={styles.questionActivityIndicator}>
                        <View style={styles.questionMembers}>
                            <Icon name="users" size={defaults.iconSize} style={styles.icons}></Icon>
                            <Text style={styles.activityNumbers}>{questionMembers}</Text>   
                        </View>
                        <View style={styles.questionMembers}>
                            <Icon name="headphones" size={defaults.iconSize} style={styles.icons}/>
                            <Text style={styles.activityNumbers}>{activeInHuddle}</Text>   
                        </View>
                    </View>     
                </View>
            </View>
                <View style={styles.sendMessage} >
                    <TextInput style={styles.input}></TextInput>
                </View>
        </KeyboardAvoidingView>
      );

};

export default QuestionPage;