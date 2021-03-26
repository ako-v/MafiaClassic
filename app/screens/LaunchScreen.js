import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';

export default function LaunchScreen({createNavigate}) {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const createNewGame = () => {
    navigation.navigate(createNavigate);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          android_ripple={{color: colors.secondary}}
          onPress={createNewGame}>
          <AppText style={styles.text}> {t('newGame')}</AppText>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          android_ripple={{color: colors.secondary}}>
          <AppText style={styles.text}>{t('howToPlay')}</AppText>
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
    backgroundColor: colors.mediumLight,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    fontFamily: 'RobotoSlab-Regular',
  },
});
