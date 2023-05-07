import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { database } from '../../../config/firebase';
import { collection, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

// Custom component imports
import Container from '../../components/atoms/display/Container';
import MediumTextInput from '../../components/atoms/inputs/MediumTextInput';
import LargeTextInput from '../../components/atoms/inputs/LargeTextInput';
import SecondaryButton from '../../components/atoms/buttons/SecondaryButton';
import ImageSquare from '../../components/atoms/display/ImageSquare';
import TextWithHiglight from '../../components/atoms/display/TextWithHiglight';
import ActionButton from '../../components/atoms/buttons/ActionButton';
import { uploadImage } from '../../services/uploadData';

export default function EditServiceScreen({ navigation, route }) {
  // the service's data from firestore collection 'services' is stored in this object if exists:
  const [serviceData, setServiceData] = useState(
    route.params?.serviceData
      ? route.params?.serviceData
      : {
          serviceName: '',
          serviceDescription: '',
          serviceImage: '',
          serviceCompanyID: route.params?.companyData?.companyID,
        },
  );
  // the service's image is stored in a separate variable, because the serviceData is going to store the url within firebase storage:
  const [serviceImage, setServiceImage] = useState(
    route.params?.serviceData?.serviceImage ? route.params?.serviceData?.serviceImage : null,
  );
  // the user's data from firestore collection 'users' is stored in this object:
  const [userData, setUserData] = useState(route.params?.userData);
  // the company's data from firestore collection 'companies' is stored in this object:
  const [companyData, setCompanyData] = useState(route.params?.companyData);

  // adding the company data to the service:
  useEffect(() => {
    setServiceData({ ...serviceData, serviceCompanyID: companyData.id });
  }, [companyData]);

  // launch the expo image picker and save the selected image into serviceImage variable:
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
      const path = `serviceImages/${companyData.id}`;
      let imageUri = await uploadImage(image, path);
      setServiceImage(image);
      setServiceData({ ...serviceData, serviceImage: imageUri });
    }
  };

  // delete the service from firestore collection 'services'
  const onDeleteServicePress = async () => {
    const serviceDocRef = doc(database, 'services', serviceData?.id);
    deleteDoc(serviceDocRef);

    navigation.navigate('MyProfileScreen', {
      userData: userData,
      companyData: companyData,
      serviceData: serviceData,
    });
  };

  // update the firestore collections 'users' and 'companies' with the input data:
  const onSavePress = async () => {
    // checking if the required fields are filled:
    if (
      serviceData.serviceName == '' ||
      serviceData.serviceDescription == '' ||
      serviceData.serviceImage == ''
    ) {
      alert('Please fill in every field!');
      return;
    }

    // if a doc already exists within firestore collection, the existing doc is being updated with the new data:
    if (serviceData.id) {
      const serviceDocRef = doc(database, 'services', serviceData.id);

      await updateDoc(serviceDocRef, {
        serviceName: serviceData.serviceName,
        serviceDescription: serviceData.serviceDescription,
        serviceImage: serviceData.serviceImage,
        serviceCompanyID: serviceData.serviceCompanyID,
      }).catch((error) => alert(error));
      // if there is no doc within firestore collection, a new one is created:
    } else {
      const collectionRef = collection(database, 'services');

      await addDoc(collectionRef, {
        serviceName: serviceData.serviceName,
        serviceDescription: serviceData.serviceDescription,
        serviceImage: serviceData.serviceImage,
        serviceCompanyID: serviceData.serviceCompanyID,
      }).catch((error) => {
        alert(error);
      });
    }

    navigation.navigate('MyProfileScreen', {
      userData: userData,
      companyData: companyData,
      serviceData: serviceData,
    });
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        <TextWithHiglight text="A service provided by " textHighlighted={companyData.companyName} />

        <View style={styles.inputContainer}>
          <MediumTextInput
            placeholder="What is the name of your service?"
            value={serviceData.serviceName}
            onChangeText={(text) => setServiceData({ ...serviceData, serviceName: text })}
          />
          <LargeTextInput
            placeholder="Describe the service!"
            numberOfLines={6}
            value={serviceData.serviceDescription}
            onChangeText={(text) => setServiceData({ ...serviceData, serviceDescription: text })}
          />
          <ImageSquare image={serviceImage} onPress={onEditImagePress} />
        </View>
        {serviceData.id && (
          <View style={styles.deleteServiceButtonContainer}>
            <View style={{ width: '40%' }}>
              <ActionButton buttonText="Delete service" onPress={onDeleteServicePress} />
            </View>
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
  inputContainer: {
    marginTop: 5,
  },
  deleteServiceButtonContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
