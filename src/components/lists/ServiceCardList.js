import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

// Custom component imports
import ServiceSummaryCard from '../organisms/ServiceSummaryCard';
import colors from '../../../colors';
import ActionButton from '../atoms/buttons/ActionButton';

export default function ServiceCardList({ services, userData, companyData, editMode, navigation }) {
  const onCreatePress = () => {
    navigation.navigate('EditServiceScreen', {
      userData: userData ? userData : {},
      companyData: companyData,
    });
  };

  return (
    <View style={styles.container}>
      {companyData && (
        <View style={styles.serviceListTitle}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.serviceListTitleText}>{companyData.companyName}</Text>
            <Text style={styles.serviceListText}>'s services</Text>
          </View>
          {editMode && <ActionButton buttonText="Create" onPress={onCreatePress} />}
        </View>
      )}
      {services?.length > 0 ? (
        <FlatList
          horizontal
          data={services}
          renderItem={(currentItem) => (
            <ServiceSummaryCard
              serviceData={currentItem.item}
              companyData={companyData}
              editMode={editMode}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <View style={styles.noServiceContainer}>
          <Text style={styles.noServiceText}>There is nothing to display yet.</Text>
          <Text style={styles.noServiceTextSmall}>Please come back later!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mediumGray,
  },
  serviceListTitle: {
    backgroundColor: colors.white,
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 7,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceListTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceListText: {
    fontSize: 16,
  },
  noServiceContainer: {
    padding: 30,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
  },
  noServiceText: {
    fontWeight: 'bold',
  },
  noServiceTextSmall: {
    fontSize: 12,
    marginTop: 3,
  },
});
