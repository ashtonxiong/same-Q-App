import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import Notifications from './components/Notifications';
import QuestionPage from './components/QuestionPage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="CoursePage" component={CoursePage} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="QuestionPage" component={QuestionPage} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="Courses" component={MainStack} />
        <Tab.Screen name="My Questions" component={Notifications} />
        <Tab.Screen name="Ask" component={Notifications} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Account" component={Notifications} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
