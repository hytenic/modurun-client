import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  entryContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  titleContainer: {
    flex: 75,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
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
  moreButtonContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginVertical: 10,
    marginBottom: 20,
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
    margin: 10,
    backgroundColor: 'rgba(250,250,250,1)',
  },
  chevron: {
    padding: 5,
    color: 'white',
    alignContent: 'center',
  },
  showMore: {
    backgroundColor: '#03d6a7',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: '#ef3832',
    padding: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
});
