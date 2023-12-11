// StartScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StartScreen = ({ navigation }) => {
  const handleNavigateToMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Добро пожаловать!</Text>
      <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToMain}>
        <Text style={styles.buttonText}>начать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
  navigateButton: {
    backgroundColor: '#3d3d3d',
    paddingTop: 7,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 10,
    borderRadius: 7,
  },
  buttonText: {
    color: 'white',
    fontSize: 23,
  },
});

export default StartScreen;
