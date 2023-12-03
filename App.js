import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import Notifications from './components/Notifications';
import QuestionPage from './components/QuestionPage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import CollabPage from './components/CollabPage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    // <View>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="CoursePage" component={CoursePage} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="QuestionPage" component={QuestionPage} />
      </Stack.Navigator>
    // </View>
  );
};

const App = () => {

  useEffect(() => {
    // Change the status bar text color (light or dark)
    StatusBar.setBarStyle('dark-content');

    // Cleanup function
    return () => {
      // Reset status bar color and style when the component is unmounted
      StatusBar.setBarStyle('default_style');
    };
  }, []);


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#5e42a6",
          tabBarInactiveTintColor: "darkgrey",
          tabBarStyle: [
            {
              display: "flex",
              paddingTop: 10
              // backgroundColor: '#cfb8e9'
            },
            null
          ]
        }}
      >
      <Tab.Screen name="Home" component={MainStack} 
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <Icon name="home" size={size} color={focused ? "#5e42a6" : 'darkgrey'} />
        ),
        
      }}/>
        <Tab.Screen name="Collaborating" component={CollabPage} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name="people" size={size} color={focused ? "#5e42a6" : 'darkgrey'} />
            ),
          }}/>
        <Tab.Screen name="Ask" component={Notifications} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name="plus" size={size} color={focused ? "#5e42a6" : 'darkgrey'} />
            ),
          }}/>
        <Tab.Screen name="Notifications" component={Notifications} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name="bell" size={size} color={focused ? "#5e42a6" : 'darkgrey'} />
            ),
          }}/>
        <Tab.Screen name="Account" component={Notifications} 
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name="settings" size={size} color={focused ? "#5e42a6" : 'darkgrey'} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

// TO REMOVE TOP HEADER:
/* import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import QuestionPage from './components/QuestionPage';
import styles from './styles';

const Stack = createStackNavigator();

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="CoursePage" component={CoursePage} />
        <Stack.Screen name="QuestionPage" component={QuestionPage} />
      </Stack.Navigator>

export default App; */

