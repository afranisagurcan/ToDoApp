import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTodoScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Hata', 'Başlık gerekli');
      return;
    }

    console.log({ title, description, date });

    Alert.alert('Başarılı', 'To-Do kaydedildi!');
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>TO DO EKLEME</Text>
        
      <Text style={styles.label}>Başlık *</Text>
      <TextInput
        style={styles.input}
        placeholder="Başlık girin"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Tarih</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text>{date ? date.toLocaleDateString() : 'Tarih seç'}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Açıklama</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Açıklama girin"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    gap: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  title : {
    fontSize : 24,
    fontWeight : 'bold' , 
    textAlign : 'center',
    paddingTop : 40,

  }
});
