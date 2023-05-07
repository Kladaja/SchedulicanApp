import React from 'react';
import { StyleSheet, Image } from 'react-native';

const logo = require('../../../../assets/logo/schedulican_logo_text.png');

export default function LogoText() {
  return <Image style={styles.logoImage} source={logo} />;
}

// The logo image adjust to its containing element
const styles = StyleSheet.create({
  logoImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});
