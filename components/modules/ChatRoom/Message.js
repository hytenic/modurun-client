import React from 'react';
import { View, Text, Image } from 'react-native';
import utils from './utils';

const Message = ({data}) => {
  const { username, message, createdAt } = data;
  const imageSource = 'https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin-300x300.jpg';

  const renderOthersMessage = () => (
    <View style={{ flexDirection: 'row', marginLeft: 5, marginBottom: 7 }}>
      <View style={{ width: 50 }}>
        <Image style={{ height: 40, width: 40, alignSelf: 'center', borderRadius: 100, resizeMode: 'cover' }} source={{ uri: imageSource }} />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <View>
          <Text style={{fontSize: 11}}>{username}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <View style={{ backgroundColor: '#e5e5ea', padding: 8, paddingHorizontal: 12, borderRadius: 10, maxWidth: '75%', borderColor: 'rgb(230, 230, 230)', borderWidth: 1 }}>
            <Text style={{ color: 'black' }}>{message}</Text>
          </View>
          <View style={{ justifyContent: 'flex-end', marginLeft: 5 }}>
            <Text style={{ fontSize: 10 }}>{utils.prettyTime(createdAt)}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMyMessage = () => (
    <View style={{ flexDirection: 'row', marginRight: 5, marginBottom: 3, justifyContent: 'flex-end' }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <View style={{ justifyContent: 'flex-end', marginRight: 5 }}>
            <Text style={{ fontSize: 10 }}>{utils.prettyTime(createdAt)}</Text>
          </View>
          <View style={{ backgroundColor: 'dodgerblue', padding: 8, paddingHorizontal: 12, borderRadius: 10, maxWidth: '75%' }}>
            <Text style={{ color: 'white' }}>{message}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMessage = () => {
    if (data.isMine) return renderMyMessage();
    return renderOthersMessage();
  };

  return (
    <>
      {renderMessage()}
    </>
  );
};

export default Message;
