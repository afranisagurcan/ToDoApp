import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '../screens/Homepage';
import Profile from '../screens/Profile';
import ContactsScreen from '../screens/ContactsScreen';
import EmptyScreen from '../screens/EmptyScreen';
import AddModal from '../components/AddModal';
import { getAuth } from '@react-native-firebase/auth';
import { RootTabParamList } from '../types/types';
import { navigateTab } from '../navigation/NavigationService';

const Tab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const [modalVisible, setModalVisible] = useState(false);
  const user = getAuth().currentUser;
  const currentUserId = user?.uid;

  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen name="Calendar" component={Homepage} />
        <Tab.Screen
          name="Add"
          component={EmptyScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
        />
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
              photoURL: user?.photoURL ?? undefined,
            },
          }}
        />
      </Tab.Navigator>

      <AddModal
        isVisible={modalVisible}
        onNavigate={({ screen, params }) => {
          setModalVisible(false);
          navigateTab(screen, params);
        }}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

export default BottomTabNavigator;
