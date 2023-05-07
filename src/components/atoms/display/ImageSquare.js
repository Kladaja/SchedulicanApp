import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { storage } from '../../../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

// custom component imports
import colors from '../../../../colors';
import RoundButton from '../buttons/RoundButton';

export default function ImageSquare({ image, editMode, onPress }) {
  const [imageUrl, setImageUrl] = useState('');

  // set the image url if there is one uploaded
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
    <View style={[styles.container, !imageUrl && styles.containerEmpty]}>
      {imageUrl ? (
        <Image style={styles.userImage} source={{ uri: imageUrl }} />
      ) : (
        <RoundButton iconName="camera" size={30} background={colors.gray} onPress={onPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  containerEmpty: {
    backgroundColor: colors.lightGray,
    borderColor: colors.gray,
    borderWidth: 3,
    borderStyle: 'dashed',
  },
  userImage: {
    width: 350,
    height: 200,
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
