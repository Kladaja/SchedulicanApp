import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../config/firebase';
import colors from '../../../colors';

export default function UserInfoMinimal({ userData, companyData, navigation }) {
  const placeholder = require('../../../assets/display/user_placeholder.png');
  const [imageUrl, setImageUrl] = useState('');

  // set the post image url
  useEffect(() => {
    if (userData.userImage) {
      const storageRef = ref(storage, userData.userImage);

      getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImageUrl(userData.userImage);
    }
  }, []);

  const onUserPress = () => {
    navigation.navigate('ProfileScreen', { userData: userData, companyData: companyData });
  };

  const onCompanyPress = () => {
    navigation.navigate('CompanyScreen', { userData: userData, companyData: companyData });
  };

  return (
    <View style={styles.container}>
      <View>
        {userData.userImage ? (
          imageUrl && <Image style={styles.userImage} source={{ uri: imageUrl }} />
        ) : (
          <Image style={styles.userImage} source={placeholder} />
        )}
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={onUserPress}>
          <Text style={styles.userFullNameText}>{userData.userFullName}</Text>
        </TouchableOpacity>

        {companyData?.companyName && (
          <TouchableOpacity onPress={onCompanyPress}>
            <Text style={styles.companyNameText}>from {companyData?.companyName}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
    marginLeft: 4,
  },
  userFullNameText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  companyNameText: {
    color: colors.gray,
    fontSize: 12,
  },
});
