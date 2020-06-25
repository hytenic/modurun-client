import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  entryContainer: {
    margin: 10,
    elevation: 2,
    borderWidth: 0,
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
    marginLeft: 40,
    width: 300,
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
    width: 100,
  },
  propRowValue: {
    padding: 5,
    borderRadius: 10,
    margin: 5,
  },
  descContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    margin: 10,
    // marginLeft: 10,
    // marginRight: 10,
    backgroundColor: 'rgba(250,250,250,1)',
    padding: 5,
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
    marginLeft: 30,
    width: 130,
  },
  cancel: {
    backgroundColor: '#ef3832',
    padding: 10,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
