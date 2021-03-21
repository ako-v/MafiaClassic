import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';

export default function LaunchScreen(props) {
  const navigation = useNavigation();

  const createNewGame = () => {
    navigation.navigate('Civilian Party');
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} android_ripple={{color: colors.secondary}} onPress={createNewGame}>
          <AppText style={styles.text}>New Game</AppText>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} android_ripple={{color: colors.secondary}}>
          <AppText style={styles.text}>How To Play</AppText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-SemiBold',
  },
});
