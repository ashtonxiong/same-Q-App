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
    fontSize: 40,
    marginTop: 30,
    fontWeight: 'bold',
  },
});

export default CoursePage;
