import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

import AppText from './AppText';

//this have to be outside of the component, because if we define it inside it will define every time function runs and always be undefined inside useEffect.
let changeTimeout;

export default function NumberInput({value = 0, onChange}) {
  const [number, SetNumber] = useState(value);

  function handleIncrease() {
    SetNumber(number + 1);
  }

  //clear changeTime out on unmount
  useEffect(() => {
    return clearTimeout(changeTimeout);
  }, []);

  //I have to use setTimeout to delay changing of context to a time when main thread is idle
  useEffect(() => {
    changeTimeout && clearTimeout(changeTimeout);
    changeTimeout = setTimeout(() => {
      onChange(number);
    }, 300);
  }, [number]);

  function handleDecrease() {
    if (number > 0) {
      SetNumber(number - 1);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDecrease} activeOpacity={0.7}>
        <Icon name="minus" size={20} color={colors.white} style={styles.icon} />
      </TouchableOpacity>
      <AppText style={styles.text}>{number}</AppText>
      <TouchableOpacity onPress={handleIncrease} activeOpacity={0.7}>
        <Icon name="plus" size={20} color={colors.white} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    borderRadius: 4,
    borderColor: colors.medium,
    borderWidth: 1,
  },
  icon: {
    backgroundColor: colors.medium,
    height: '100%',
    padding: 8,
    borderRadius: 2,
  },
  text: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
