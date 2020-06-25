import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  touchableContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flex: 5,
  },
  value: {
    marginLeft: 20,
    fontWeight: 'bold',
  },
  buttonImage: {
    marginLeft: 10,
    textAlign: 'right',
  },
  body: {
    padding: 0,
  }
})