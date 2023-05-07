import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { database } from '../../../config/firebase';
import { collection, doc, updateDoc, addDoc } from 'firebase/firestore';

// custom component imports
import Container from '../../components/atoms/display/Container';
import TextWithHiglight from '../../components/atoms/display/TextWithHiglight';
import SecondaryButton from '../../components/atoms/buttons/SecondaryButton';

export default function EditAppointmentcreen({ navigation, route }) {
  const [userData, setUserData] = useState(route.params?.userData);
  const [companyData, setCompanyData] = useState(route.params?.companyData);
  const [serviceData, setServiceData] = useState(route.params?.serviceData);

  const onSavePress = async () => {};

  return (
    <Container>
      <ScrollView style={styles.container}>
        <TextWithHiglight text="Appointments for " textHighlighted={serviceData.serviceName} />
        <TextWithHiglight text="provided by " textHighlighted={companyData.companyName} />

        <View style={styles.inputContainer}>
          <View style={styles.inputLine}></View>
        </View>

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
  inputLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
