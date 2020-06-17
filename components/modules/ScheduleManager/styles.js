import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  entryContainer: {
    // backgroundColor: 'dodgerblue',
    margin: 10,
    elevation: 2,
    borderWidth: 0,
  },
  titleContainer: {
    flex: 75,
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
    flex: 25,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  propRowContainer: {
    flexDirection: 'row',
  },
  propRowKey: {
    padding: 5,
    borderRadius: 10,
    color: 'white',
    margin: 5,
    width: 100,
  },
  propRowValue: {
    padding: 5,
    borderRadius: 10,
    margin: 5,
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
  showMore: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: 'dodgerblue',
    borderRadius: 20,
  },
  cancel: {
    backgroundColor: 'firebrick',
    padding: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
