import React from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as actions from '../../redux/action/MyPage';

const MyPage = (props) => {
  const { exmapleState, dispatchProp } = props;
  return (
    <View>
      <TouchableOpacity style={{padding:3, backgroundColor:'green'}} onPress={()=>{dispatchProp(exmapleState)}}>
        <Text>버튼이라고 침</Text>
      </TouchableOpacity>
      <Text>fdsfads</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    exmapleState: state.myPage.exampleKey.exampleKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchProp: (num) => {
      dispatch(actions.exAction1(num));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({});
