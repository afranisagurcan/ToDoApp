/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
        <BottomTabNavigator />
    </NavigationContainer>
  );
}

export default App;
