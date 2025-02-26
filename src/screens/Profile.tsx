import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
  const auth = getAuth();
  const navigation = useNavigation<NavigationProp<any>>();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (!user) {
      Alert.alert("Çıkış Hatası", "Zaten giriş yapılmamış.");
      return;
    }

    try {
      console.log("Çıkış yapılıyor...");

      await signOut(auth);

      await GoogleSignin.signOut();

      console.log("Çıkış yapıldı!");
      Alert.alert("Çıkış Yapıldı", "Başarıyla çıkış yapıldı.");

      navigation.reset({
        index: 0,
        routes: [{ name: "GoogleSignInScreen" }],
      });

    } catch (error) {
      console.error("Çıkış Hatası:", error);
      Alert.alert("Çıkış Hatası", error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={user?.photoURL ? { uri: user.photoURL } : require('../assets/images/default_profile_image.jpg')}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>Adı: {user?.displayName || "Bilinmiyor"}</Text>
      <Text>Email: {user?.email || "Bilinmiyor"}</Text>
      <Button title="Çıkış Yap" onPress={handleSignOut} />
    </View>
  );
};

export default Profile;
