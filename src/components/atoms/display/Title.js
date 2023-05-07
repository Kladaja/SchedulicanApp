import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../../../colors';

export default function Title({ text }) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.primaryLight,
    alignSelf: 'center',
    paddingTop: 25,
    paddingBottom: 20,
  },
});
