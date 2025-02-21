import React from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
  const user = auth().currentUser;
  const navigation = useNavigation<NavigationProp<any>>();

  const handleSignOut = async () => {
    try {
      console.log("çıkıştayız");
      await auth().signOut();
      console.log("çıktık");

      Alert.alert("Çıkış Yapıldı", "Başarıyla çıkış yapıldı.");

      navigation.reset({
        index: 0,
        routes: [{ name: "GoogleSignIn" }],
      });

    } catch (error) {
      console.error("Çıkış Hatası:", error);
      Alert.alert("Çıkış Hatası", error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu.");
    }
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bilinmeyen Kullanıcı</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={user.photoURL ? { uri: user.photoURL } : require('../assets/images/default_profile_image.jpg')}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>Adı: {user.displayName}</Text>
      <Text>Email: {user.email}</Text>
      <Button title="Çıkış Yap" onPress={handleSignOut} />
    </View>
  );
};

export default Profile;
