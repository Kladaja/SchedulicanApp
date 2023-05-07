import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const logo = require('../../../../assets/logo/schedulican_logo_text.png');

export default function LogoTextForHeader() {
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={logo} />
    </View>
  );
}

// The logo image adjust to its containing element
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 40,
  },
  logoImage: {
    flex: 1,
    width: 200,
    height: 40,
    resizeMode: 'contain',
  },
});
