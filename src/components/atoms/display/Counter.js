import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../../../../colors';

export default function Counter({ value, label }) {
  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 10,
  },
});
