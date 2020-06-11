import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import SideBar from './SideBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  main: {
    flex: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const MainHeader = ({ navigation }) => {
  const toggleSideBar = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
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
      </View>
      <View style={styles.main}>
        <Text>메인</Text>
      </View>
    </View>
  );
};

export default MainHeader


