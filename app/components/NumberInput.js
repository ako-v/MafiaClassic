import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';

import AppText from './AppText';

export default function NumberInput({quantity = 0, onquantityChange}) {
  function handleIncrease() {
    onquantityChange(quantity + 1);
  }

  function handleDecrease() {
    if (quantity > 0) {
      onquantityChange(quantity - 1);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDecrease}>
        <Icon name="minus" size={20} color={colors.white} style={styles.icon} />
      </TouchableOpacity>
      <AppText style={styles.text}>{quantity}</AppText>
      <TouchableOpacity onPress={handleIncrease}>
        <Icon name="plus" size={20} color={colors.white} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: colors.medium,
    borderWidth: 1,
  },
  icon: {
    backgroundColor: colors.medium,
    height: '100%',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  text: {
    marginHorizontal: 8,
  },
});
