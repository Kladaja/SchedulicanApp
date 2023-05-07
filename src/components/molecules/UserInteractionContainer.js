import React from 'react';
import { StyleSheet, View } from 'react-native';

// Custom component imports
import ActionButton from '../atoms/buttons/ActionButton';
import colors from '../../../colors';

export default function UserInteractionContainer({
  onEditPress,
  onLogoutPress,
  onFollowPress,
  isSelf = false,
  editAllowed = false,
  isFollowing = false,
}) {
  const content = isSelf ? (
    editAllowed && (
      <View style={styles.container}>
        <ActionButton buttonText="Edit" onPress={onEditPress} />
        <ActionButton buttonText="Log out" onPress={onLogoutPress} />
      </View>
    )
  ) : isFollowing ? (
    <View style={styles.container}>
      <ActionButton buttonText="Unfollow" onPress={onFollowPress} />
    </View>
  ) : (
    <View style={styles.container}>
      <ActionButton buttonText="Follow" onPress={onFollowPress} />
    </View>
  );

  return content;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
