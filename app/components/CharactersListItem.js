import React from 'react';
import {View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../config/colors';
import AppText from './AppText';
import NumberInput from './NumberInput';
import Icon from './CustomIcons';
import RightActionDelete from './RightActionDelete';
import capitalize from '../utils/capitalize';
import {useTranslation} from 'react-i18next';

export default function CharactersListItem({item, onChange, onDelete}) {
  const {t} = useTranslation('roles');
  return (
    <Swipeable
      renderRightActions={() => (
        <RightActionDelete onPress={() => onDelete(item)} />
      )}>
      <View style={styles.container}>
        {item.icon && (
          <Icon
            name={item.icon}
            size={35}
            color={colors.dark}
            style={styles.icon}
          />
        )}
        <AppText style={styles.name}>{capitalize(t(item.name))}</AppText>
        {item.quantity != undefined ? (
          <NumberInput
            quantity={item.quantity}
            onquantityChange={newQuantity => onChange(item, newQuantity)}
          />
        ) : (
          <CheckBox
            onValueChange={() => onChange(item)}
            value={item.selected}
            tintColors={{true: colors.dark, false: colors.dark}}
            style={styles.checkbox}
          />
        )}
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  icon: {
    padding: 5,
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontFamily: 'RobotoSlab-Regular',
  },
});
