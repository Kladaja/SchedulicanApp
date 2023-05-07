import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

// custom component imports:
import ImageRound from '../atoms/display/ImageRound';
import colors from '../../../colors';

export default function CompanyInfo({ companyName, companyLogo, companyDescription }) {
  const description =
    companyDescription !== '' ? (
      <Text style={styles.companyDescriptionText}>{companyDescription}</Text>
    ) : null;

  return (
    <View style={styles.container}>
      <ImageRound image={companyLogo} hasCompany={true} isCompany={true} />
      <View style={styles.textContainer}>
        <Text style={styles.companyNameText}>{companyName}</Text>
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
    paddingBottom: 8,
    paddingHorizontal: 7,
    marginTop: 2,
    backgroundColor: colors.white,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyNameText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  companyDescriptionText: {
    fontSize: 13,
    lineHeight: 17,
    padding: 5,
  },
});
