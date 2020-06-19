import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleInputBox: {
    borderWidth: 0.5,
    backgroundColor: '#e3dede',
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
    height: 45,
  },
  pickerView: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    // alignContent: 'center',
  },
  pickerTitle: {
    backgroundColor: '#e3dede',
    padding: 5,
    alignItems: 'center',
    fontSize: 15,
    borderRadius: 8,
  },
  picker: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 8,
    width: 120,
    marginLeft: 20,
  },
  pickerText: {
    // backgroundColor: 'green',
    padding: 5,
    marginLeft: 10,
    width: 80,
  },
  icon: {
    // backgroundColor: 'blue',
    width: 25,
    height: 25,
    marginTop: 2,
    marginRight: 10,
  },
  selectedTrack: {
    backgroundColor: '#e3dede',
    margin: 30,
    width: 260,
    height: 250,
    // alignItems: 'center',
    alignSelf: 'center',
  },
  unSelectedTrack: {
    backgroundColor: '#e3dede',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#4FB0C6',
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    width: 80,
    alignItems: 'center',
  },
  timeInput: {
    marginLeft: 10,
    width: 100,
    height: 40,
    alignSelf: 'center',
  },
});

export default styles;
