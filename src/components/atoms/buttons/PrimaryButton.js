import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../../../../colors';

export default function PrimaryButton({ buttonText, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 13,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 17,
  },
});
