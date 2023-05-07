import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import colors from '../../../../colors';

export default function MediumTextInput({
  placeholder,
  autoCapitalize,
  keyboardType,
  textContentType,
  value,
  onChangeText,
  numberOfLines,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      textContentType={textContentType}
      value={value}
      onChangeText={(value) => onChangeText(value)}
      numberOfLines={numberOfLines}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
});
