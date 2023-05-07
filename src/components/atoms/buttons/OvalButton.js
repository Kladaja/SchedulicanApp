import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../../colors';

export default function OvalButton({ buttonText, iconName, size, background, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: background }]} onPress={onPress}>
        <Ionicons name={iconName} size={size} color={colors.white} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
