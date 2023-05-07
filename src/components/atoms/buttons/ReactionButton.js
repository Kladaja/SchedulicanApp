import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../../../colors';

export default function ReactionButton({ iconName, size, isActive = false, buttonText, onPress }) {
  const color = isActive ? colors.primary : colors.gray;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} size={size} color={color} />
      <Text style={[styles.text, isActive && styles.activeText]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.gray,
    fontSize: 13,
    marginLeft: 2,
  },
  activeText: {
    color: colors.primary,
  },
});
