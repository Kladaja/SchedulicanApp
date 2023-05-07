import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { storage } from '../../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

// custom component imports:
import PostInteractionContainer from '../molecules/PostInteractionContainer';
import colors from '../../../colors';

export default function UserPostCard({
  navigation,
  postData,
  userData,
  companyData,
  isMyProfileScreen,
}) {
  const [imageUrl, setImageUrl] = useState('');

  // set the image url if there is one uploaded
  useEffect(() => {
    if (postData?.postImage && !postData?.postImage.startsWith('file://')) {
      const storageRef = ref(storage, postData?.postImage);

      getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImageUrl(postData?.postImage);
    }
  }, [postData]);

  return (
    postData && (
      <View style={styles.container}>
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
          userData={userData}
          companyData={companyData}
          editMode={true}
          isMyProfileScreen={isMyProfileScreen}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: 7,
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 5,
    borderRadius: 10,
  },
});
