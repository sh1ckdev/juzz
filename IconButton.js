// IconButton.js
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const IconButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

const styles = {
  iconButton: {
    position: 'absolute',
    bottom: 50,
    right: 8,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
};

export default IconButton;
