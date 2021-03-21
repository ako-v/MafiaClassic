import React, {useEffect, useState} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';

import getSelectedCharacters from '../utils/getSelectedCharacters';
import shuffle from '../utils/shuffle';
import capitalize from '../utils/capitalize';
import colors from '../config/colors';
import {useContext} from 'react/cjs/react.development';
import StateContext from '../StateContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DealScreen() {
  const appState = useContext(StateContext);
  const navigation = useNavigation();
  const [shuffledCharacters, setShuffledCharacters] = useState(null);
  const [roleText, setRoleText] = useState('Please tap and hold to view your role');
  const [roleIndex, setRoleIndex] = useState(0);
  const [seenStatus, setSeenStatus] = useState(false);
  const [nextText, setNextText] = useState('Next');
  const [isAnyRoleSelected, setIsAnyRoleSelected] = useState(false);

  useEffect(() => {
    if (appState.roles) {
      const selectedCharacters = getSelectedCharacters(appState.roles);
      if (selectedCharacters.length != 0) {
        setShuffledCharacters(shuffle(selectedCharacters));
        setIsAnyRoleSelected(true);
      } else {
        setIsAnyRoleSelected(false);
        setRoleText('There is no role selected\r\nPlease go back and select roles');
        setSeenStatus(true);
      }
    }
  }, [appState.roles]);

  const handleShowRole = () => {
    if (isAnyRoleSelected) {
      setRoleText('You role is ' + capitalize(shuffledCharacters[roleIndex].name));
      setSeenStatus(true);
    }
  };

  const handleHideRole = () => {
    if (isAnyRoleSelected) {
      setRoleText('Tap to view your role again\r\nTap next to go to the next player');
    }
  };

  const handleNext = () => {
    if (isAnyRoleSelected && roleIndex < shuffledCharacters.length - 1) {
      setRoleIndex(roleIndex + 1);
      setRoleText('Please tap and hold to view your role');
      setSeenStatus(false);
      if (roleIndex == shuffledCharacters.length - 2) setNextText('Done');
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
    <Screen style={styles.container}>
      <>
        {isAnyRoleSelected && (
          <>
            <AppText style={styles.text}>{`${roleIndex + 1} of ${shuffledCharacters.length} characters`}</AppText>
            <AppText>{seenStatus ? 'You saw your role' : 'Unseen'}</AppText>
          </>
        )}
        <Pressable style={styles.roleArea} onTouchStart={handleShowRole} onTouchEnd={handleHideRole}>
          {isAnyRoleSelected && (
            <Icon
              style={styles.eye}
              name={seenStatus ? 'eye' : 'eye-off'}
              size={250}
              color={seenStatus ? colors.medium : colors.mediumLight}
            />
          )}
          <AppText style={styles.roletext}>{roleText}</AppText>
        </Pressable>
        <Pressable
          style={[styles.button, !seenStatus && {backgroundColor: colors.medium}]}
          onPress={handleNext}
          disabled={!seenStatus}>
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    position: 'absolute',
    alignSelf: 'center',
    top: '0%',
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
