import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AddModal from '../components/AddModal';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList, NavigateTarget } from '../types/navigation';

type AddScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Add'>;

interface Props {
  navigation: AddScreenNavigationProp;
}

const AddScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleNavigate = ({ screen, params }: NavigateTarget) => {
    setModalVisible(false);
    navigation.navigate(screen, params as any); // 👈 Burada `as any` ile params uyumsuzluk uyarısını bastırıyoruz
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Add" onPress={() => setModalVisible(true)} />
      <AddModal
        isVisible={modalVisible}
        onNavigate={handleNavigate}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default AddScreen;
