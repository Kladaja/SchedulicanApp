import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// custom component imports:
import ImageRound from '../atoms/display/ImageRound';
import colors from '../../../colors';

export default function UserInfo({
  userEmail,
  userCompanyName,
  userFullName,
  userImage,
  userDescription,
  onCompanyPress,
}) {
  const description =
    userDescription !== '' ? (
      <Text style={styles.userDescriptionText}>{userDescription}</Text>
    ) : null;

  return (
    <View style={styles.container}>
      <ImageRound image={userImage} hasCompany={userCompanyName ? true : false} />
      <View style={styles.textContainer}>
        <Text style={styles.userFullNameText}>{userFullName ? userFullName : userEmail}</Text>
        {userCompanyName && (
          <TouchableOpacity onPress={onCompanyPress}>
            <View style={styles.companyContainer}>
              <Text style={styles.text}>from </Text>
              <Text style={styles.companyNameText}>{userCompanyName}</Text>
            </View>
          </TouchableOpacity>
        )}
        {description}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginTop: 2,
    backgroundColor: colors.white,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  userFullNameText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  companyContainer: {
    flexDirection: 'row',
  },
  text: {
    color: colors.gray,
    fontSize: 12,
  },
  companyNameText: {
    color: colors.gray,
    fontSize: 12,
    fontWeight: 'bold',
  },
  userDescriptionText: {
    fontSize: 12,
    marginTop: 7,
    textAlign: 'center',
  },
});
