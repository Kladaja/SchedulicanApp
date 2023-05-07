import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../colors';

import Counter from '../atoms/display/Counter';

export default function CompanyCounters({
  companyLikeCounter = 0,
  companyFollowerCounter = 0,
  companyPostCounter = 0,
}) {
  return (
    <View style={styles.container}>
      <Counter value={companyFollowerCounter} label="Followers" />
      <Counter value={companyPostCounter} label="Posts" />
      <Counter value={companyLikeCounter} label="Likes" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGray,
  },
});
