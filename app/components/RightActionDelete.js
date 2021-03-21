import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../config/colors';

export default function RightActionDelete({onPress}) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.rightAction}>
        <Icon name="trash-can-outline" size={35} color={colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    height: '100%',
    width: 70,
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
