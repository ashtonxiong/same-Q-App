import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import Notifications from './components/Notifications';
import BottomBar from './components/BottomBar';
import QuestionPage from './components/QuestionPage';
import styles from './styles';
import Ripple from 'react-native-material-ripple';


// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#b986ee', // Change the default background color
//         },
//         headerTintColor: '#fff', // Change the default text color
//         headerTitleStyle: {
//           fontWeight: 'bold', // Make the default text bold
//         },
//       }}>
//         <Stack.Screen name="Home" component={HomePage} />
//         <Stack.Screen name="CoursePage" component={CoursePage} />
//         <Stack.Screen name="Notifications" component={Notifications} />
//         <Stack.Screen name="QuestionPage" component={QuestionPage} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home 1" component={BottomBar} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home"         
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
component={HomePage} /> */}
      <Tab.Screen name="Courses" component={HomePage} />
      <Tab.Screen name="Account" component={QuestionPage} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default App;
