import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// custom component imports
import colors from '../../../../colors';

export default function TextWithHiglight({ text, textHighlighted }) {
  return (
    <View style={styles.headerTextContainer}>
      <Text>{text}</Text>
      <Text style={styles.highlightedText}>{textHighlighted}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerTextContainer: {
    flexDirection: 'row',
  },
  highlightedText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
