import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { database } from '../../../config/firebase';
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import { uploadImage } from '../../services/uploadData';

// custom component imports
import Container from '../../components/atoms/display/Container';
import ImageRound from '../../components/atoms/display/ImageRound';
import MediumTextInput from '../../components/atoms/inputs/MediumTextInput';
import LargeTextInput from '../../components/atoms/inputs/LargeTextInput';
import SecondaryButton from '../../components/atoms/buttons/SecondaryButton';
import ActionButton from '../../components/atoms/buttons/ActionButton';
import colors from '../../../colors';

export default function EditUserScreen({ navigation, route }) {
  // the currently logged in user's data from firestore collection 'users' is stored in this object
  const [userData, setUserData] = useState(route.params.userData);
  // the user's image is stored in a separate variable, because the userData is going to store the url within firebase storage
  const [userImage, setUserImage] = useState(route.params.userData.userImage);
  // the company that belongs to the currently logged in user is stored in this object
  const [companyData, setCompanyData] = useState(
    route.params.companyData
      ? route.params.companyData
      : { companyName: '', companyDescription: '', companyLogo: '' },
  );
  // the user's image is stored in a separate variable, because the userData is going to store the url within firebase storage
  const [companyLogo, setCompanyLogo] = useState(route.params.companyData?.companyLogo);

  const onEditImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Any,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    }).catch((error) => {
      alert(error);
    });

    if (!result.canceled) {
      return result;
    }
  };

  // launch the expo image picker and save the selected image into userImage variable
  const onEditUserImagePress = async () => {
    const result = await onEditImagePress();

    if (result) {
      const image = result.assets[0].uri;
      const path = `userImages/${userData.userID}`;
      let imageUri = await uploadImage(image, path);
      setUserImage(image);
      setUserData({ ...userData, userImage: imageUri });
    }
  };

  // launch the expo image picker and save the selected image into companyLogo variable
  const onEditCompanyLogoPress = async () => {
    const result = await onEditImagePress();
    console.log('onEditCompanyLogoPress: result: ', result);

    if (result) {
      const image = result.assets[0].uri;
      const path = `companyImages/${companyData.id}`;
      let imageUri = await uploadImage(image, path);
      setCompanyLogo(image);
      setCompanyData({ ...companyData, companyLogo: imageUri });
    }
  };

  const onAddCompanyPress = async () => {
    if (companyData.id === '') {
      setUserData({ ...userData, userHasCompany: true });
    } else {
      setUserData({ ...userData, userHasCompany: true, userCompanyID: companyData.id });
    }
  };

  // remove the connection between the user and the company
  const onRemoveCompanyPress = async () => {
    setUserData({ ...userData, userHasCompany: false, userCompanyID: '' });
  };

  // update the firestore collections 'users' and 'companies' with the input data
  const onSavePress = async () => {
    // check if the user already has a company to decide wheter an update or a create action is needed:
    if (companyData.companyName == '') {
      // if the company data fields are empty but the user already has a company registered, an alert message is displayed to inform the user about the missing fields
      if (userData.userCompanyID) {
        // the company data cannot be empty and deleting the company should not be done this way
        alert('Please provide company data!');
        return;
      }
    }
    if (companyData.companyName != '') {
      // if the company data fields are not empty and the user already has a company registered, the existing company document is beig updated
      if (userData.userCompanyID) {
        const companyDocRef = doc(database, 'companies', userData.userCompanyID);

        await updateDoc(companyDocRef, {
          companyName: companyData.companyName,
          companyDescription: companyData.companyDescription,
          companyLogo: companyData.companyLogo,
        });
      }
      // if the company data fields are not empty and the user does not have a company registered, a new company document is being added to the companies collection
      if (!userData.userCompanyID && userData.userHasCompany) {
        const collectionRef = collection(database, 'companies');

        await addDoc(collectionRef, {
          companyName: companyData.companyName,
          companyDescription: companyData.companyDescription,
          companyLogo: companyData.companyLogo,
        })
          .then((response) => {
            // the user's data is also updated with the created company document's details
            userData.userCompanyID = response.id;
            userData.userHasCompany = true;
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
    const userDataCopy = JSON.parse(JSON.stringify(userData));
    const userDocRef = doc(database, 'users', userData.id);
    // updating the user's data
    try {
      await updateDoc(userDocRef, {
        userEmail: userDataCopy.userEmail,
        userFullName: userDataCopy.userFullName,
        userDescription: userDataCopy.userDescription,
        userImage: userDataCopy.userImage,
        userFollowerCounter: userDataCopy.userFollowerCounter,
        userLikeCounter: userDataCopy.userLikeCounter,
        userPostCounter: userDataCopy.userPostCounter,
        userCompanyID: userDataCopy.userCompanyID,
        userHasCompany: userDataCopy.userHasCompany,
      });
      console.log(userData);

      navigation.navigate('MyProfileScreen', {
        userData: userData,
        companyData: userData.userHasCompany ? companyData : null,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        {userData && (
          <View>
            <ImageRound
              image={userImage}
              hasCompany={userData.userHasCompany}
              editMode={true}
              onPress={onEditUserImagePress}
            />
            <MediumTextInput
              placeholder="What is your full name?"
              value={userData.userFullName}
              onChangeText={(text) => setUserData({ ...userData, userFullName: text })}
            />
            <MediumTextInput
              placeholder="What is your email address?"
              value={userData.userEmail}
              onChangeText={(text) => setUserData({ ...userData, userEmail: text })}
            />
            <LargeTextInput
              placeholder="Give a short summary about yourself!"
              numberOfLines={2}
              value={userData.userDescription}
              onChangeText={(text) => setUserData({ ...userData, userDescription: text })}
            />
          </View>
        )}
        {companyData && !userData.userHasCompany && (
          <View style={styles.addCompanyButtonContainer}>
            <View style={{ width: '40%' }}>
              <ActionButton buttonText="Add company" onPress={onAddCompanyPress} />
            </View>
          </View>
        )}
        {companyData && userData.userHasCompany && (
          <View>
            <View style={styles.companyHeaderConatiner}>
              <Text style={styles.titleText}>Company data</Text>
              <ActionButton buttonText="Remove" onPress={onRemoveCompanyPress} />
            </View>
            <ImageRound
              image={companyLogo}
              hasCompany={true}
              isCompany={true}
              editMode={true}
              onPress={onEditCompanyLogoPress}
            />
            <MediumTextInput
              placeholder="What is your company's name?"
              value={companyData?.companyName}
              onChangeText={(text) => setCompanyData({ ...companyData, companyName: text })}
            />
            <LargeTextInput
              placeholder="Give a short summary about your company!"
              numberOfLines={2}
              value={companyData?.companyDescription}
              onChangeText={(text) => setCompanyData({ ...companyData, companyDescription: text })}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <SecondaryButton buttonText="Save" onPress={onSavePress} />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addCompanyButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  companyHeaderConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
