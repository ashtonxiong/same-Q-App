import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CoursePage = ({ route }) => {
  const { course } = route.params;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>{course.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pageHeader: {
    width: '100%',
    height: '100%',
    marginTop: '10%',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default CoursePage;
