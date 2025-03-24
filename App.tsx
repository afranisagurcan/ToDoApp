import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { stackNavigationRef } from './src/navigation/NavigationService';
import GoogleSignInScreen from './src/screens/GoogleSignInScreen';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import AddTodoScreen from './src/screens/AddTodoScreen';
import AddEventScreen from './src/screens/AddEventScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string>('GoogleSignInScreen');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseAuthTypes.User | null) => {
      setUser(user);
      setInitialRoute(user ? 'BottomTabNavigator' : 'GoogleSignInScreen');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={stackNavigationRef}>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GoogleSignInScreen" component={GoogleSignInScreen} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} />
        <Stack.Screen name="AddEvent" component={AddEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

export default App;
