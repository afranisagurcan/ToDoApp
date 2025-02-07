import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';
import Homepage from '../screens/Homepage';
import Profile from '../screens/Profile';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import  navigatorStyles  from '../styles/navigatorStyles'

const Tab = createBottomTabNavigator();

interface CustomTabBarProps extends BottomTabBarProps {
  iconNames: Record<string, string>;
}

function CustomTabBar({ state, navigation, iconNames }: CustomTabBarProps) {
  return (
    <View style={navigatorStyles.container}>
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = iconNames[label] || 'circle';

        if (label === 'Add') {
          return (
            <TouchableOpacity key={index} style={navigatorStyles.addButton} onPress={onPress}>
              <View style={navigatorStyles.addButtonInner}>
                <FontAwesome name={iconName} size={24} color={isFocused ? 'black' : 'gray'}/>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={index} style={navigatorStyles.iconButton} onPress={onPress}>
            <FontAwesome name={iconName} size={24} color={isFocused ? 'black' : 'gray'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function BottomTabNavigator() {
  const iconNames = {
    Home: 'home',
    Calendar: 'calendar',
    Add: 'plus',
    UserPlus: 'user-plus',
    Profile: 'user',
  };

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} iconNames={iconNames} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Calendar" component={Homepage} />
      <Tab.Screen name="Add" component={Homepage} />
      <Tab.Screen name="UserPlus" component={Homepage} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
