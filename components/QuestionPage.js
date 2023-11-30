import React, {useState, useRef, useEffect} from 'react';
import { View, Animated, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Touchable, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles';
import defaults from '../globalConstants'


const QuestionPage = ({ route }) => {

    const { question } = route.params;
    const helpTime = "2:15 PM";
    var questionMembers = "2";

    const [activeInHuddle, setActiveInHuddle] = useState(0);
    const [userInHuddle, setUserInHuddle] = useState(false);
    const [huddleText, setHuddleText] = useState("");


    const animatedValue = new Animated.Value(0);

    //ChatGPT color-fading code
    useEffect(() => {
        let interval;
    
        // Start the animation immediately when userInHuddle becomes true
        if (userInHuddle) {
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000, // Change the duration as needed
            useNativeDriver: false,
          }).start();
    
          // Set up the loop after the initial animation
          interval = setInterval(() => {
            Animated.timing(animatedValue, {
              toValue: animatedValue._value === 0 ? 1 : 0,
              duration: 1000, // Change the duration as needed
              useNativeDriver: false,
            }).start();
          }, 1000); // Change the interval as needed
        }
    
        // Cleanup function to stop the loop when userInHuddle becomes false
        return () => {
            clearInterval(interval);
          };
        }, [userInHuddle, animatedValue]); // Only re-run the effect when userInHuddle changes
    
      // Ensure the color returns to dark grey when userInHuddle becomes false
        useEffect(() => {
            if (!userInHuddle) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 1000, // Change the duration as needed
                useNativeDriver: false,
            }).start();
        }
    }, [userInHuddle, animatedValue]);
  
    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['darkgrey', 'lightblue'],
    });

    const huddleTextGenerator = () => {
        if (userInHuddle && activeInHuddle === 1) {
            setHuddleText("You're the only one in the huddle.");
        } else if (activeInHuddle === 0) {
            setHuddleText("Huddle inactive. Tap to Join.");
        } else if (activeInHuddle > 1) {
            setHuddleText(`You and ${activeInHuddle} others are in the huddle!`);
        }
    };

    const handleHuddleEnterExit = () => {
        if (userInHuddle) {
            setUserInHuddle(false);
            setActiveInHuddle(prevCount => prevCount - 1);
        } else {
            setUserInHuddle(true);
            setActiveInHuddle(prevCount => prevCount + 1);
        }
    };

    useEffect(() => {
        huddleTextGenerator();
    }, [userInHuddle, activeInHuddle]);

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

    function Message(text, time, senderID, senderName) {
        this.text = text;
        this.time = time;
        this.sender = senderID;
        this.senderName = senderName;

        this.color = senderID != defaults.user ? 'lightgrey' : '#5052b5'
        this.textColor = senderID != defaults.user ? 'black' : 'white'
        this.alignment = senderID != defaults.user ? 'flex-start' :  'flex-end'
    }

    const messagesStart = [
        new Message("Anyone made any progress?", 20, 1, "Adam"),
        new Message("I got through part b, but after that I'm lost", 22, 1, "Jenna")
    ]

    const [messages, setMessages] = useState(messagesStart);

    const addMessage = () => {
        if (text.trim() === '') {
          // Don't add empty items
          return;
        }
    
        setMessages((messages) => [...messages, new Message(text, Date.now(), 0, "You")]);
        setText(''); // Clear the TextInput after adding an item
      };

    const messagesRef = useRef();

    return (
        // This makes it so you can 'tap out' of the text entry area
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            {/* This makes it so everything moves up when the keyboard does */}
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} style={styles.questionContainer}>
                
                <View style={styles.topBlock}>
                    {/* <View style={styles.pageHeader}>
                        <Text style={styles.courseBoxTEXT}>CS147</Text>
                    </View> */}
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
                <TouchableWithoutFeedback onPress={() => handleHuddleEnterExit()}>
                    <Animated.View style={[styles.huddleBar, {backgroundColor: backgroundColor}]}>      
                        <Text style={styles.huddleBarTEXT}>{huddleText}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                
                
                {/* Area for texts and join huddle button */}
                <View style={styles.TextsArea}>
                    <ScrollView ref={messagesRef}
                    onContentSizeChange={() => messagesRef.current.scrollToEnd({ animated: true })}>
                    {messages.map((message) => (
                        <View>
                            <Text style={[styles.senderStyle, {alignSelf: message.alignment}]}>{message.senderName}</Text>
                            <View key={message.time} style={[styles.message, {backgroundColor: message.color, alignSelf: message.alignment}]}>
                                <Text style={[styles.messageTEXT, {color: message.textColor}]}>{message.text}</Text>
                            </View>
                        </View>
                        
                    ))}

                    </ScrollView>
                    {/* <TouchableOpacity style={styles.huddleButton}>

                    </TouchableOpacity> */}


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
                        <TouchableOpacity  onPress={addMessage}>
                            <Icon name="paper-plane" size={defaults.iconSize*1.5} style={styles.icons}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );

};

export default QuestionPage;