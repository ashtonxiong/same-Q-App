import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CoursePage from './CoursePage';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
      <Tab.Navigator>
        <Tab.screen name="CoursePage" component={CoursePage} />
      </Tab.Navigator>
  );
};

export default BottomBar;