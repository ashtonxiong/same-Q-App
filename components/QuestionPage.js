import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuestionPage = ({ route }) => {

    const { question } = route.params;

    const navigation = useNavigation();

    return (
        <Text>TEST</Text>
    )

};

export default QuestionPage;