import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  propRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  propRowKey: {
    padding: 5,
    color: '#03D6A7',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 12,
    marginRight: 15,
    width: '20%',
  },
  propRowValue: {
    fontSize: 11,
    color: 'black',
  },
  propRowValueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 8,
  },
});
