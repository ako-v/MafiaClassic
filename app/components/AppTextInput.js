import React from 'react';
import {TextInput} from 'react-native';
import colors from '../config/colors';

import defaultStyles from '../config/style';
export default function AppTextInput({style, ...otherProps}) {
  return (
    <TextInput
      style={[defaultStyles.text, style]}
      placeholderTextColor={colors.medium}
      {...otherProps}
    />
  );
}
