import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  entryContainer: {
    // backgroundColor: 'dodgerblue',
    margin: 10,
    elevation: 2,
    borderWidth: 0,
  },
  titleContainer: {
    padding: 2,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
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
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  propRowKey: {
    padding: 5,
    color: '#03D6A7',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 10,
    marginRight: 15,
    width: '20%',
  },
  propRowValue: {
    fontSize: 10,
    color: 'black',
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
