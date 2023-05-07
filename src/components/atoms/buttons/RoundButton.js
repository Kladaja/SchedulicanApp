import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../../colors';

export default function RoundButton({ iconName, size, background, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, { backgroundColor: background }]} onPress={onPress}>
        <Ionicons name={iconName} size={size} color={colors.white} />
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
    width: 47,
    height: 47,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
