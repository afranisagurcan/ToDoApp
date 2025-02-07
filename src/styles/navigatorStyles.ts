import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const navigatorStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#FAD4D4',
    padding: 15,
    borderRadius: 50,
    marginTop: -20,
    borderWidth: 4,
    borderColor: '#FFEDED',
  },
  addButtonInner: {
    backgroundColor: '#F8BFBF',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  

export default navigatorStyles;