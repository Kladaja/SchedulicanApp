import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { storage } from '../../../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

// custom component imports
import ReactionButton from '../buttons/ReactionButton';
import colors from '../../../../colors';

export default function ImageRound({
  image,
  hasCompany,
  isCompany = false,
  editMode = false,
  onPress,
}) {
  const placeholder = isCompany
    ? require('../../../../assets/logo/schedulican_logo_icon_light.png')
    : require('../../../../assets/display/user_placeholder.png');
  const [imageUrl, setImageUrl] = useState('');

  // set the user or company profile image url if the user or the company has one uploaded
  useEffect(() => {
    if (image && !image.startsWith('file://')) {
      const storageRef = ref(storage, image);

      getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImageUrl(image);
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <View style={hasCompany ? styles.imageBackgroundCompany : styles.imageBackground}>
        {imageUrl ? (
          <Image
            style={[styles.userImage, hasCompany && styles.userImageBorder]}
            source={{ uri: imageUrl }}
          />
        ) : (
          <Image
            style={[
              styles.userImage,
              styles.userImagePlaceholder,
              hasCompany && styles.userImageBorder,
              isCompany && { backgroundColor: colors.mediumGray },
            ]}
            source={placeholder}
          />
        )}
      </View>

      {editMode && (
        <View style={styles.editButton}>
          <ReactionButton iconName="pencil" size={20} color={colors.secondary} onPress={onPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageBackground: {
    backgroundColor: colors.gray,
    borderRadius: 50,
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackgroundCompany: {
    backgroundColor: colors.secondary,
    borderRadius: 50,
    width: 105,
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 2,
  },
  userImagePlaceholder: {
    backgroundColor: colors.white,
  },
  editButton: {
    position: 'absolute',
    right: 110,
    bottom: -2,
    width: 33,
    height: 33,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
    borderColor: colors.secondary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
