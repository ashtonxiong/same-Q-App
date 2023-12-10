import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./components/HomePage";
import CoursePage from "./components/CoursePage";
import Notifications from "./components/Notifications";
import AskPage from "./components/askPage";
import QuestionPage from "./components/QuestionPage";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import CollabPage from "./components/CollabPage";
import FillerPage from "./components/FillerPage";
import SettingsPage from "./components/SettingsPage";
import Similar from "./components/Similar";
import { DeviceIdentifierProvider } from "./components/deviceID";
// import "react-native-gesture-handler";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="CoursePage" component={CoursePage} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="QuestionPage" component={QuestionPage} />
      <Stack.Screen name="CollabPage" component={CollabPage} />
      <Stack.Screen name="AskPage" component={AskPage} />
      <Stack.Screen name="FillerPage" component={FillerPage} />
      <Stack.Screen name="SettingsPage" component={SettingsPage} />
      <Stack.Screen name="Similar" component={Similar} />
    </Stack.Navigator>
  );
};

const CollabStack = createStackNavigator();

const CollabStackScreen = () => {
  return (
    <CollabStack.Navigator screenOptions={{ headerShown: false }}>
      <CollabStack.Screen name="CollabPage" component={CollabPage} />
      <CollabStack.Screen name="QuestionPage" component={QuestionPage} />
    </CollabStack.Navigator>
  );
};

const AskStack = createStackNavigator();

const AskStackScreen = () => {
  return (
    <AskStack.Navigator screenOptions={{ headerShown: false }}>
      <AskStack.Screen name="AskPage" component={AskPage} />
      <AskStack.Screen name="Similar" component={Similar} />
    </AskStack.Navigator>
  );
};

const App = () => {
  return (
    <DeviceIdentifierProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#9f6fdd",
            tabBarStyle: [
              {
                display: "flex",
                backgroundColor: "white",
                height: "10%",
              },
              null,
            ],
          }}
        >
          <Tab.Screen
            name="Home"
            component={MainStack}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Icon
                  name="home"
                  size={size}
                  color={focused ? "#000" : "#9f6fdd"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Collaborating"
            component={CollabStackScreen}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Icon
                  name="people"
                  size={size}
                  color={focused ? "#000" : "#9f6fdd"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Ask"
            component={AskStackScreen}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Icon
                  name="plus"
                  size={size}
                  color={focused ? "#000" : "#9f6fdd"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Icon
                  name="bell"
                  size={size}
                  color={focused ? "#000" : "#9f6fdd"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsPage}
            options={{
              tabBarIcon: ({ color, size, focused }) => (
                <Icon
                  name="settings"
                  size={size}
                  color={focused ? "#000" : "#9f6fdd"}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </DeviceIdentifierProvider>
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
