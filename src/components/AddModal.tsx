import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { RootTabParamList } from '../types/types';
import { NavigateTarget } from '../types/navigation';
import { navigateStack } from '../navigation/NavigationService';

interface Props {
  isVisible: boolean;
  onNavigate: <T extends keyof RootTabParamList>(target: NavigateTarget<T>) => void;
  onClose: () => void;
}

const AddModal: React.FC<Props> = ({ isVisible, onNavigate, onClose }) => {
  if (!isVisible) return null;

  return (
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.modal}>
        <Text style={styles.title}>Ne eklemek istiyorsun?</Text>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            onClose();
            navigateStack('AddTodo', undefined);
          }}
        >
          <Text style={styles.optionText}>To-Do Ekle</Text>
        </TouchableOpacity>

       
        <TouchableOpacity
        style={styles.optionButton}
        onPress={() => {
            onClose();
            navigateStack('AddEvent', undefined);
        }}
        >
        <Text style={styles.optionText}>Etkinlik Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>İptal</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default AddModal;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    width,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 10,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
