import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import Profile from '../screens/Profile';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import navigatorStyles from '../styles/navigatorStyles';
import GoogleSignInScreen from '../screens/GoogleSignInScreen';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const user = auth().currentUser;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Calendar" component={Homepage} />
      <Tab.Screen name="Add" component={Homepage} />
      <Tab.Screen name="UserPlus" component={Homepage} />
      <Tab.Screen name="Profile" component={Profile} initialParams={{ user }} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
