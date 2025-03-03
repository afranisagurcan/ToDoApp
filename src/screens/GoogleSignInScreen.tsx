import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const firebaseConfig = {
  apiKey: "AIzaSyBfu13js7QxWQT877fKWPWIs90XBsPXTck",
  authDomain: "todoevent-5cc7a.firebaseapp.com",
  projectId: "todoevent-5cc7a",
  storageBucket: "todoevent-5cc7a.appspot.com",
  messagingSenderId: "338985090242",
  appId: "1:338985090242:web:aa88a8c6775fb42f8f8f5b",
  measurementId: "G-4RGBYLXCJG"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const GoogleSignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "338985090242-mqgmcpeor75sn8sv4o8b0cktk7nf15ai.apps.googleusercontent.com",
      iosClientId: "338985090242-rv7hfg4uo4m0l6i9ts2ct6ne7kboa494.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
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

      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;

      // Firestore'da kullanıcı var mı kontrol et
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
        console.log('✅ Kullanıcı Firestore\'a eklendi.');
      } else {
        console.log('ℹ️ Kullanıcı zaten kayıtlı.');
      }

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
