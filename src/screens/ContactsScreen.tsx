import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { getGoogleContacts } from '../services/googlePeopleService';
import { findUserByEmail  , addFriendToFirestore} from '../services/firebaseService';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/types';

type ContactsScreenProps = BottomTabScreenProps<RootTabParamList, 'ContactsScreen'>;

const ContactsScreen: React.FC<ContactsScreenProps> = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const googleContacts = await getGoogleContacts();
  
      const contactsWithStatus = await Promise.all(
        googleContacts.map(async (contact) => {
          const rawEmail = contact.emailAddresses?.[0]?.value;
          if (!rawEmail) return { ...contact, appUser: null };
  
          const email = rawEmail.trim().toLowerCase();
          const appUser = await findUserByEmail(email);
  
          return { ...contact, appUser };
        })
      );
  
      setContacts(contactsWithStatus);
      setLoading(false);
    };
  
    fetchContacts();
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Google Kişileriniz</Text>
      {loading ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text style={styles.contactText}>
                {item.names?.[0]?.displayName} - {item.emailAddresses?.[0]?.value}
              </Text>
              {item.appUser ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                    console.log("Arkadaş ekleniyor:", item.appUser.id);
                    addFriendToFirestore(
                        item.appUser.id,
                        item.emailAddresses?.[0]?.value,
                        item.names?.[0]?.displayName
                    );
                    }}
                >
                    <Text style={styles.buttonText}>Ekle</Text>
                </TouchableOpacity>
) : (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: '#34C759' }]}
    onPress={() => {
      console.log("Davet gönder:", item.emailAddresses?.[0]?.value);
      // Buraya ileride paylaşım ekleyebilirsin
    }}
  >
    <Text style={styles.buttonText}>Davet Et</Text>
  </TouchableOpacity>
)}

            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 5,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ContactsScreen;
