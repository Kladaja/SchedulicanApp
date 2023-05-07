import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { database } from '../../../config/firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// Custom component imports
import Container from '../../components/atoms/display/Container';
import LargeTextInput from '../../components/atoms/inputs/LargeTextInput';
import SecondaryButton from '../../components/atoms/buttons/SecondaryButton';
import TextWithHiglight from '../../components/atoms/display/TextWithHiglight';
import ImageSquare from '../../components/atoms/display/ImageSquare';
import { uploadImage } from '../../services/uploadData';
import ActionButton from '../../components/atoms/buttons/ActionButton';

export default function EditPostScreen({ navigation, route }) {
  // the currently logged in user's data from firestore collection 'users' is stored in this object:
  const [userData, setUserData] = useState(route.params?.userData);
  // the company that belongs to the currently logged in user is stored in this object:
  const [companyData, setCompanyData] = useState(route.params?.companyData);
  // the post's data is stored in this object:
  const [postData, setPostData] = useState(
    route.params?.postData
      ? route.params?.postData
      : {
          postDescription: '',
          postImage: '',
          postLikeCounter: 0,
          postCommentCounter: 0,
          postUserID: userData.userID,
          postCompanyID: companyData?.id || '',
          postServiceID: '',
          postAppointmentCounter: 0,
        },
  );
  // the post's image is stored in a separate variable, because the postData is going to store the url within firebase storage:
  const [postImage, setPostImage] = useState(
    route.params?.postData?.postImage ? route.params?.postData?.postImage : null,
  );

  // launch the expo image picker and save the selected image into postImage variable:
  const onEditImagePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    }).catch((error) => {
      alert(error);
    });

    if (!result.canceled) {
      const image = result.assets[0].uri;
      const path = `postImages/${userData.userID}`;
      let imageUri = await uploadImage(image, path);
      setPostImage(image);
      setPostData({ ...postData, postImage: imageUri });
    }
  };

  // delete the post from firestore collection 'posts', and also update the user's post counter
  const onDeletePostPress = async () => {
    const postDocRef = doc(database, 'posts', postData?.id);
    deleteDoc(postDocRef);

    const userDocRef = doc(database, 'users', userData.id);

    await updateDoc(userDocRef, {
      ...userData,
      userPostCounter: userData.userPostCounter - 1,
    });
    setUserData({ ...userData, userPostCounter: userData.userPostCounter - 1 });

    navigation.navigate('MyProfileScreen', {
      userData: userData,
      companyData: companyData,
      postData: postData,
    });
  };

  // update the firestore collections 'posts' with the input data:
  const onSavePress = async () => {
    // checking if the required fields are filled:
    if (postData.postDescription == '') {
      alert('Please fill in every field!');
      return;
    }

    // if a doc already exists within firestore collection, the existing doc is being updated with the new data:
    if (postData?.id) {
      const postDocRef = doc(database, 'posts', postData?.id);

      await updateDoc(postDocRef, {
        postDescription: postData.postDescription,
        postImage: postData.postImage,
        postLikeCounter: postData.postLikeCounter,
        postCommentCounter: postData.postCommentCounter,
        postUserID: postData.postUserID,
        postCompanyID: postData.postCompanyID,
        postServiceID: postData.postServiceID,
        postAppointmentCounter: postData.postAppointmentCounter,
      }).catch((error) => alert(error));
      // if there is no doc within firestore collection, a new one is created:
    } else {
      const collectionRef = collection(database, 'posts');

      await addDoc(collectionRef, {
        postDescription: postData.postDescription,
        postImage: postData.postImage,
        postLikeCounter: postData.postLikeCounter,
        postCommentCounter: postData.postCommentCounter,
        postUserID: postData.postUserID,
        postCompanyID: postData.postCompanyID,
        postServiceID: postData.postServiceID,
        postAppointmentCounter: postData.postAppointmentCounter,
      }).catch((error) => {
        alert(error);
      });

      const userDocRef = doc(database, 'users', userData.id);

      await updateDoc(userDocRef, {
        ...userData,
        userPostCounter: userData.userPostCounter + 1,
      });
      setUserData({ ...userData, userPostCounter: userData.userPostCounter + 1 });
    }

    navigation.navigate('MyProfileScreen', {
      userData: userData,
      companyData: companyData,
      postData: postData,
    });
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        {companyData && (
          <TextWithHiglight text="Create a post for  " textHighlighted={companyData.companyName} />
        )}

        <View style={styles.inputContainer}>
          <LargeTextInput
            placeholder="What do you want to share with others?"
            value={postData.postDescription}
            onChangeText={(text) => setPostData({ ...postData, postDescription: text })}
            numberOfLines={6}
          />
          <ImageSquare image={postImage} onPress={onEditImagePress} />
        </View>
        {postData.id && (
          <View style={styles.deletePostButtonContainer}>
            <View style={{ width: '40%' }}>
              <ActionButton buttonText="Delete post" onPress={onDeletePostPress} />
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <SecondaryButton buttonText="Save" size={44} onPress={onSavePress} />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
  },
  attachementsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 5,
  },
  deletePostButtonContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
