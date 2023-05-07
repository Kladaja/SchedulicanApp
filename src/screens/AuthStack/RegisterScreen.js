import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

// Custom component imports
import Container from '../../components/atoms/display/Container';
import LogoText from '../../components/atoms/display/LogoText';
import Title from '../../components/atoms/display/Title';
import MainTextInput from '../../components/atoms/inputs/MainTextInput';
import PrimaryButton from '../../components/atoms/buttons/PrimaryButton';
import TextWithLink from '../../components/atoms/buttons/TextWithLink';
import colors from '../../../colors';

export default function RegisterScreen({ navigation }) {
  // the form input is stored within an object:
  const [userData, setUserData] = useState({
    userID: '',
    userEmail: '',
    userFullName: '',
    userDescription: '',
    userImage: '',
    userFollowerCounter: 0,
    userLikeCounter: 0,
    userPostCounter: 0,
    userCompanyID: '',
    userHasCompany: false,
  });

  // the password and the confirm password is stored in these variables:
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegisterPress = () => {
    // checking if the required fields are filled:
    if (userData.userEmail == '' || password == '' || confirmPassword == '') {
      alert('Please fill in every field!');
      return;
      // checking if the password and the confirm text are the same:
    } else if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    } else {
      // creating a user within firebase auth with the added email and password:
      createUserWithEmailAndPassword(auth, userData.userEmail, password)
        .then((response) => {
          // getting the created user's uid from the response and adding it to a user object
          const responseUserID = response.user.uid;
          const userDataCopy = JSON.parse(JSON.stringify(userData));
          userDataCopy.userID = responseUserID;

          // getting the reference to the firestore collection 'users' and adding a new item to it with the user object's data
          const collectionRef = collection(database, 'users');
          addDoc(collectionRef, userDataCopy).catch((error) => {
            alert(error);
          });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const onLoginPress = () => {
    // navigating to the login page:
    navigation.navigate('Login');
  };

  return (
    <Container style={styles.whiteContainer}>
      <View style={styles.logoContainer}>
        <LogoText />
      </View>
      <Title text="Register" />
      <MainTextInput
        style={styles.input}
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={userData.userEmail}
        onChangeText={(text) => setUserData({ ...userData, userEmail: text })}
      />
      <MainTextInput
        style={styles.input}
        placeholder="Enter your password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <MainTextInput
        style={styles.input}
        placeholder="Confirm password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <PrimaryButton onPress={onRegisterPress} buttonText="Register" />
      <TextWithLink text="Already have an account? " linkText="Log in" onPress={onLoginPress} />
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
    position: 'absolute',
    top: 60,
    left: 10,
    width: '60%',
    height: 40,
    marginBottom: 30,
  },
});
