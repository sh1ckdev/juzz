import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FooterButton = ({ scrollViewRef }) => {
  if (!scrollViewRef) {
    console.error('Не передан scrollViewRef в FooterButton');
    return null;
  }

  const handleNavigateToMain = () => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToMain}>
        <Text style={styles.buttonText}>наверх</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#3d3d3d',
    padding: 2,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navigateButton: {
    backgroundColor: '#3d3d3d',
    padding: 10,
    borderTopWidth: 0,
    borderTopColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default FooterButton;
