import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../../colors';

import Counter from '../atoms/display/Counter';

export default function UserCounters({
  userLikeCounter = 0,
  userFollowerCounter = 0,
  userPostCounter = 0,
}) {
  return (
    <View style={styles.container}>
      <Counter value={userFollowerCounter} label="Followers" />
      <Counter value={userPostCounter} label="Posts" />
      <Counter value={userLikeCounter} label="Likes" />
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
