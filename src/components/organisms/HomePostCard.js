import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { auth } from '../../../config/firebase';

// custom component imports:
import UserInfoMinimal from '../molecules/UserInfoMinimal';
import PostInteractionContainer from '../molecules/PostInteractionContainer';
import colors from '../../../colors';
import { fetchCompanyWithID, fetchUserWithID } from '../../services/fetchData';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../config/firebase';

export default function HomePostCard({ postData, navigation, refreshScreen }) {
  const currentUserID = auth.currentUser.uid;
  const [userData, setUserData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchUserWithID(postData.postUserID, setUserData);
  }, []);

  useEffect(() => {
    if (userData?.userHasCompany) {
      fetchCompanyWithID(userData.userCompanyID, setCompanyData);
    }
  }, [userData]);

  // set the post image url
  useEffect(() => {
    if (postData.postImage && !postData.postImage.startsWith('file://')) {
      const storageRef = ref(storage, postData.postImage);

      getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImageUrl(postData.postImage);
    }
  }, [postData]);

  return (
    userData &&
    (!userData.hasCompany || companyData) && (
      <View style={styles.container}>
        <UserInfoMinimal userData={userData} companyData={companyData} navigation={navigation} />

        <View style={styles.contentContainer}>
          {imageUrl && (
            <Image
              style={postData.postImage ? styles.bannerImage : {}}
              source={{ uri: imageUrl }}
            />
          )}
          <Text style={styles.contentText}>{postData.postDescription}</Text>
        </View>
        <PostInteractionContainer
          navigation={navigation}
          postData={postData}
          editMode={currentUserID == userData.userID}
          refreshScreen={refreshScreen}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: 7,
    marginVertical: 7,
    padding: 10,
    borderRadius: 10,
  },
  contentContainer: {
    display: 'flex',
  },
  contentText: {
    fontSize: 13,
    marginVertical: 3,
    paddingBottom: 10,
    borderColor: colors.mediumGray,
    borderBottomWidth: 1,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    marginTop: 3,
    marginBottom: 5,
    borderRadius: 10,
  },
});
