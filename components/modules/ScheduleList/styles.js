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
    color: 'white',
    alignContent: 'center',
  },
  joinSchedule: {
    backgroundColor: 'dodgerblue',
    padding: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
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
