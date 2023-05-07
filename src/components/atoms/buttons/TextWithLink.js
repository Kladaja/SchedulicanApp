import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Custom component imports
import colors from '../../../../colors';

export default function TextWithLink({ text, linkText, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 14,
  },
  link: {
    fontWeight: '600',
    color: colors.primaryLight,
    fontSize: 14,
  },
});
