import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'; // ✅ Firebase Web SDK kullanılıyor
import { initializeApp } from 'firebase/app';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const firebaseConfig = {
  apiKey: "AIzaSyBfu13js7QxWQT877fKWPWIs90XBsPXTck",
  authDomain: "todoevent-5cc7a.firebaseapp.com",
  projectId: "todoevent-5cc7a",
  storageBucket: "todoevent-5cc7a.firebasestorage.app",
  messagingSenderId: "338985090242",
  appId: "1:338985090242:web:aa88a8c6775fb42f8f8f5b",
  measurementId: "G-4RGBYLXCJG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const GoogleSignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "338985090242-mqgmcpeor75sn8sv4o8b0cktk7nf15ai.apps.googleusercontent.com",
      iosClientId: "338985090242-rv7hfg4uo4m0l6i9ts2ct6ne7kboa494.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();

      if (!idToken) {
        throw new Error("ID Token alınamadı!");
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);

      await signInWithCredential(auth, googleCredential);

      Alert.alert("Başarıyla giriş yapıldı!");
      navigation.navigate("BottomTabNavigator");

    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Giriş başarısız", error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Google ile Giriş Yap" onPress={signInWithGoogle} />
    </View>
  );
};

export default GoogleSignInScreen;
