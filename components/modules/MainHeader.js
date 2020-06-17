import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import * as Location from 'expo-location';

const MainHeader = ({ navigation }) => {
  const toggleSideBar = () => {
    navigation.openDrawer();
  };
  
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {
        toggleSideBar();
      }}
      >
        <Image
          source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
          style={{ width: 25, height: 25, marginLeft: 15 }}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.search}
        onEndEditing={(result) => {
          console.log(result.nativeEvent.text)
          Location.geocodeAsync(result.nativeEvent.text)
              .then((data) => {
                console.log('hh ',data[0]);
              });
        // MapView의 상태를 변화시켜야하는데    
        }}
      />
    </View>
  );
};
// let result = Location.geocodeAsync('gupabal')
//               .then((data) => {
//                 console.log(data);
//               });
export default MainHeader

const styles = StyleSheet.create({
  search: {
  backgroundColor: 'white',
  marginLeft: 20,
  width: 320,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f15c5c',
    alignItems: 'center',
    //   justifyContent: 'center',
    padding: 5,
  },
})