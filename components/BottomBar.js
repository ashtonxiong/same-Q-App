// BottomBar.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage';
import CoursePage from './CoursePage';
import Notifications from './Notifications';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="CoursePage" component={CoursePage} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
};

export default BottomBar;
