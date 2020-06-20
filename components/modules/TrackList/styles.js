import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  entryContainer: {
    margin: 10,
    // elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  titleContainer: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    flex: 75,
  },
  titleButtonContainer: {
    flex: 25,
    justifyContent: 'center',
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
    alignContent: 'center',
  },
  delete: {
    padding: 10,
    backgroundColor: 'firebrick',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  showDetail: {
    padding: 10,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
});
