import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Image, TextInput
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Scheduler from './modules/Scheduler';
import TrackManager from './modules/TrackManagerTab';
import MyPage from './modules/MyPage';
import TrackMasterContainer from './modules/TrackMasterContainer';
import FilterModal from './modules/FilterModal';
import MainHeader from './modules/MainHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f15c5c',
    alignItems: 'center',
    //   justifyContent: 'center',
    padding: 5,
  },
  main: {
    flex: 10,
    // backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 5,
  },
  search: {
    backgroundColor: 'white',
    marginLeft: 20,
    width: 320,
  },
  filterButton: {
    position: 'absolute',
    right: 60,
    top: 19,
  },
});

// const MainHeader = ({ navigation }) => {
//   const toggleSideBar = () => {
//     navigation.openDrawer();
//   };
  
//   return (
//     <View style={styles.header}>
//       <TouchableOpacity onPress={() => {
//         toggleSideBar();
//       }}
//       >
//         <Image
//           source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
//           style={{ width: 25, height: 25, marginLeft: 15 }}
//         />
//       </TouchableOpacity>
//       <TextInput style={styles.search}/>
//     </View>
//   );
// };

const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MainHeader navigation={navigation} mapViewChanging/>
      </View>
      <View style={styles.main}>
        <TrackMasterContainer mode='scheduleViewer' />
          <View style={styles.filterButton}>
            <FilterModal style={styles.main}/>
          </View>
      </View>
    </View>
  );
};


const Drawer = createDrawerNavigator();

function SideBar() {
    return (
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Scheduler" component={Scheduler} />
        <Drawer.Screen name="TrackManager" component={TrackManager} />
        <Drawer.Screen name="MyPage" component={MyPage} />
      </Drawer.Navigator>
    );
  }

export default SideBar;

