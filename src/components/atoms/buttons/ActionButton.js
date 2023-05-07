import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../../../colors';

export default function ActionButton({ buttonText, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.primaryLight,
    fontSize: 13,
  },
});
