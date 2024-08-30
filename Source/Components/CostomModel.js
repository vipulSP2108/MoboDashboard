import React from 'react';
import { StatusBar, View } from 'react-native';
import { Modal, TouchableOpacity } from 'react-native';

const CustomModal = ({ visible, setVisible, content, backTabON = true }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType='fade'
      onRequestClose={() => setVisible(false)}
    >
      <StatusBar hidden={true} backgroundColor={'black'} />
      <View style={{
        flex: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}>
        {backTabON && <TouchableOpacity onPress={() => setVisible(false)} style={{ position: 'absolute', height: '100%', width: '100%' }} />}
        {content}
      </View>
    </Modal>
  );
};

export default CustomModal;
