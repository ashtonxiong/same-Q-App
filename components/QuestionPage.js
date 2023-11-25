import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Touchable, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
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

    //ChatGPT code for scrolling text properly
    const scrollViewRef = useRef();
    const [text, setText] = useState('');

    const handleTextChange = (inputText) => {
        setText(inputText);
    };

    useEffect(() => {
        // Scroll to the end whenever text changes
        scrollViewRef.current.scrollToEnd({ animated: true});
    }, [text]);

    return (
        // This makes it so you can 'tap out' of the text entry area
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            {/* This makes it so everything moves up when the keyboard does */}
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

                {/* Area for texts and join huddle button */}
                <View style={styles.TextsArea}>
                    <ScrollView></ScrollView>
                    <TouchableOpacity style={styles.huddleButton}>

                    </TouchableOpacity>


                </View>
                
                <View style={styles.sendMessage}>
                    <ScrollView
                    style={styles.input2}
                    ref={scrollViewRef}>
                            <TextInput 
                            placeholder="Tap to message" 
                            placeholderTextColor="#545353"
                            style={styles.input}
                            multiline
                            value={text}
                            onChangeText={handleTextChange}>
                            </TextInput>
                    </ScrollView>
                    <View style={styles.sendMessageBUTTON}>
                        {/* This needs to be made to do something still */}
                        <TouchableOpacity>
                            <Icon name="paper-plane" size={defaults.iconSize*1.5} style={styles.icons}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );

};

export default QuestionPage;