import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';

import getSelectedCharacters from '../utils/getSelectedCharacters';
import shuffle from '../utils/shuffle';
import capitalize from '../utils/capitalize';
import colors from '../config/colors';
import StateContext from '../StateContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';

export default function DealScreen() {
  const {t} = useTranslation('deal');
  const appState = useContext(StateContext);
  const navigation = useNavigation();
  const [shuffledCharacters, setShuffledCharacters] = useState(null);
  const [roleText, setRoleText] = useState(t('tapToView'));
  const [roleIndex, setRoleIndex] = useState(0);
  const [seenStatus, setSeenStatus] = useState(false);
  const [nextText, setNextText] = useState(t('next'));
  const [isAnyRoleSelected, setIsAnyRoleSelected] = useState(false);

  useEffect(() => {
    setRoleText(t('tapToView'));
    setNextText(t('next'));
  }, []);

  useEffect(() => {
    if (appState.roles) {
      const selectedCharacters = getSelectedCharacters(appState.roles);
      if (selectedCharacters.length != 0) {
        setShuffledCharacters(shuffle(selectedCharacters));
        setIsAnyRoleSelected(true);
      } else {
        setIsAnyRoleSelected(false);
        setRoleText(t('noRoleSelected'));
        setNextText(t('done'));
        setSeenStatus(true);
      }
    }
  }, [appState.roles]);

  const handleShowRole = () => {
    if (isAnyRoleSelected) {
      setRoleText(t('yourRole') + capitalize(t(`roles:${shuffledCharacters[roleIndex].name}`)) + t('roleIs'));
      setSeenStatus(true);
    }
  };

  const handleHideRole = () => {
    if (isAnyRoleSelected) {
      setRoleText(t('tapToViewAgain'));
    }
  };

  const handleNext = () => {
    if (isAnyRoleSelected && roleIndex < shuffledCharacters.length - 1) {
      setRoleIndex(roleIndex + 1);
      setRoleText(t('tapToView'));
      setSeenStatus(false);
      if (roleIndex == shuffledCharacters.length - 2) setNextText(t('done'));
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      });
    }
  };

  return (
    <Screen style={styles.screen}>
      <>
        {isAnyRoleSelected && (
          <AppText style={styles.text}>{`${
            roleIndex + 1 + ' ' + t('of') + ' ' + shuffledCharacters.length + ' ' + t('characters')
          }`}</AppText>
        )}
        <Pressable style={styles.roleArea} onTouchStart={handleShowRole} onTouchEnd={handleHideRole}>
          {isAnyRoleSelected && (
            <Icon
              style={styles.eye}
              name={seenStatus ? 'eye' : 'eye-off'}
              size={250}
              color={seenStatus ? colors.secondary : colors.mediumLight}
            />
          )}
          <AppText style={styles.roletext}>{roleText}</AppText>
        </Pressable>
        <Pressable style={[styles.button, !seenStatus && {backgroundColor: colors.medium}]} onPress={handleNext} disabled={!seenStatus}>
          <AppText>{nextText}</AppText>
        </Pressable>
      </>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: '40%',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    position: 'absolute',
    alignSelf: 'center',
    top: '0%',
    opacity: 0.5,
  },
  roleArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roletext: {
    fontFamily: 'RobotoSlab-Medium',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'RobotoSlab-Medium',
    textAlign: 'center',
    marginVertical: 4,
  },
});
