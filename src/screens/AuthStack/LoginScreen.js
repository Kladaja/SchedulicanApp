import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';

// Custom component imports
import Container from '../../components/atoms/display/Container';
import LogoFull from '../../components/atoms/display/LogoFull';
import MainTextInput from '../../components/atoms/inputs/MainTextInput';
import colors from '../../../colors';
import TextWithLink from '../../components/atoms/buttons/TextWithLink';
import PrimaryButton from '../../components/atoms/buttons/PrimaryButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Firebase login
  const onLoginPress = () => {
    if (email == '' && password == '') {
      alert('Please fill in every field!');
      return;
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        alert(error);
      });
    }
  };

  const onRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <Container style={styles.whiteContainer}>
      <View style={styles.logoContainer}>
        <LogoFull />
      </View>
      <MainTextInput
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <MainTextInput
        placeholder="Enter your password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <PrimaryButton onPress={onLoginPress} buttonText="Log in" />
      <TextWithLink text="Don't have an account? " linkText="Register" onPress={onRegisterPress} />
    </Container>
  );
}

const styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: '84%',
    height: 110,
    marginHorizontal: '8%',
    marginBottom: 30,
  },
});
