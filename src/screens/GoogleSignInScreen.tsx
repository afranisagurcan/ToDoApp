import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, useNavigation } from "@react-navigation/native";

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

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      Alert.alert("Başarıyla giriş yapıldı!");

      navigation.reset({
        index: 0,
        routes: [{ name: "MainApp" }],
      });

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
