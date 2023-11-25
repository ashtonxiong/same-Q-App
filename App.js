import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import Notifications from './components/Notifications';
import QuestionPage from './components/QuestionPage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#cfb8e9', // Set the background color
          },
        }}
        tabBarOptions={{
          activeTintColor: '#000', // Set the active tab color
          inactiveTintColor: '#9f6fdd', // Set the inactive tab color
        }}
      >
      <Tab.Screen name="Home" component={MainStack} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={"#000"} />
        ),
      }}/>
        <Tab.Screen name="Collaborating" component={Notifications} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="people" size={size} color={"#000"} />
            ),
          }}/>
        <Tab.Screen name="Ask" component={Notifications} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus" size={size} color={"#000"} />
            ),
          }}/>
        <Tab.Screen name="Notifications" component={Notifications} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" size={size} color={"#000"} />
            ),
          }}/>
        <Tab.Screen name="Account" component={Notifications} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings" size={size} color={"#000"} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
