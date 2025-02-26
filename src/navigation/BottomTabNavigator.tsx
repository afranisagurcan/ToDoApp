import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import Profile from '../screens/Profile';
import React from 'react';
import { getAuth } from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();
const auth = getAuth(); 

function BottomTabNavigator() {
  const user = auth.currentUser;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Calendar" component={Homepage} />
      <Tab.Screen name="Add" component={Homepage} />
      <Tab.Screen name="UserPlus" component={Homepage} />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        initialParams={{ user: { displayName: user?.displayName, email: user?.email, photoURL: user?.photoURL } }} 
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
