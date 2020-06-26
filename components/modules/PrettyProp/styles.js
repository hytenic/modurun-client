import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  entryContainer: {
    // backgroundColor: 'dodgerblue',
    margin: 10,
    elevation: 2,
    borderWidth: 0,
  },
  titleContainer: {
    padding: 10,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    flex: 8,
  },
  titleButtonContainer: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  propRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propRowKey: {
    padding: 5,
    color: '#03D6A7',
    textAlignVertical: 'center',
    textAlign: 'center',
    margin: 5,
    marginRight: 15,
    width: '20%',
  },
  propRowValue: {
    padding: 5,
    borderRadius: 10,
    color: 'black',
    marginRight: 10,
  },
  propRowValueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 8,
    // padding: 7,
  },
  descContainer: {
    backgroundColor: 'rgba(250,250,250,1)',
    padding: 5,
  },
  chevron: {
    padding: 5,
    color: 'white',
    alignContent: 'center',
  },
});
