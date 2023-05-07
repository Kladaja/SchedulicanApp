import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../../../../colors';

export default function SecondaryButton({ buttonText, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '45%',
    backgroundColor: colors.secondary,
    paddingVertical: 13,
    marginRight: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 14,
  },
});
