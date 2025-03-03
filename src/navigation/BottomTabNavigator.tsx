import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import Profile from '../screens/Profile';
import ContactsScreen from '../screens/ContactsScreen';
import { getAuth } from '@react-native-firebase/auth';
import { RootTabParamList } from '../types/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const user = getAuth().currentUser;

  const currentUserId = user?.uid;

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Calendar" component={Homepage} />
      <Tab.Screen name="Add" component={Homepage} />
      <Tab.Screen 
        name="ContactsScreen" 
        component={ContactsScreen} 
        initialParams={{ currentUserId: currentUserId ?? '' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        initialParams={{ 
          user: { 
            displayName: user?.displayName ?? undefined, 
            email: user?.email ?? undefined, 
            photoURL: user?.photoURL ?? undefined 
          } 
        }} 
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
