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
    borderRadius: 10,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    margin: 5,
    // flex: 1,
  },
  propRowValue: {
    padding: 5,
    borderRadius: 10,
    // marginVertical: 5,
    marginRight: 10,
    // marginBottom: 5,
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
