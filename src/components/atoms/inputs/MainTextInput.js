import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

// Custom component imports
import colors from '../../../../colors';

export default function MainTextInput({
  placeholder,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
  keyboardType,
  textContentType,
  value,
  onChangeText,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      textContentType={textContentType}
      value={value}
      onChangeText={(value) => onChangeText(value)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.mediumGray,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 13,
  },
});
