import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { storage } from '../../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

// custom component imports:
import ActionButton from '../atoms/buttons/ActionButton';
import colors from '../../../colors';

export default function ServiceSummaryCard({
  serviceData,
  userData,
  companyData,
  editMode = false,
  navigation,
}) {
  const [imageUrl, setImageUrl] = useState('');

  // set the image url if there is one uploaded
  useEffect(() => {
    if (serviceData?.serviceImage && !serviceData?.serviceImage.startsWith('file://')) {
      const storageRef = ref(storage, serviceData?.serviceImage);

      getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImageUrl(serviceData?.serviceImage);
    }
  }, [serviceData]);

  const onEditServicePress = () => {
    navigation.navigate('EditServiceScreen', {
      userData: userData ? userData : {},
      companyData: companyData,
      serviceData: serviceData,
    });
  };

  const onAddAppointmentPress = () => {
    navigation.navigate('EditAppointmentScreen', {
      userData: userData ? userData : {},
      companyData: companyData,
      serviceData: serviceData,
    });
  };

  const onApplyPress = () => {
    console.log('Apply pressed');
  };

  // different buttons are displayed if the owner ow the service or if other users see the service card
  const buttons = editMode ? (
    <View style={{ flexDirection: 'row' }}>
      <ActionButton buttonText="Edit" onPress={onEditServicePress} />
      <ActionButton buttonText="Add appointment" onPress={onAddAppointmentPress} />
    </View>
  ) : (
    <ActionButton buttonText="Apply" onPress={onApplyPress} />
  );

  return (
    serviceData && (
      <View style={styles.container}>
        <Text style={styles.serviceTitle}>{serviceData.serviceName}</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.serviceDescription}>{serviceData.serviceDescription}</Text>
          {imageUrl && (
            <Image
              style={serviceData.serviceImage ? styles.serviceImage : {}}
              source={{ uri: imageUrl }}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>{buttons}</View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 330,
    marginLeft: 8,
    marginVertical: 12,
    padding: 15,
    borderColor: colors.secondary,
    borderLeftWidth: 15,
  },
  serviceTitle: {
    color: colors.secondaryDark,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentContainer: {
    display: 'flex',
  },
  serviceDescription: {
    fontSize: 13,
    marginBottom: 10,
    marginVertical: 3,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    paddingTop: 7,
  },
});
