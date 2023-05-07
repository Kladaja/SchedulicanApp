import React, { useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';

// custom component imports:
import ProfileScreenTemplate from '../../components/templates/ProfileScreenTemplate';
import {
  fetchUserWithID,
  fetchCompanyWithID,
  fetchServicesWithCompanyID,
  fetchPostsWithUserID,
} from '../../services/fetchData';

export default function MyProfileScreen({ navigation, route }) {
  const currentUserID = auth.currentUser.uid;
  const [userData, setUserData] = useState(route.params?.userData ? route.params?.userData : null);
  const [companyData, setCompanyData] = useState(
    route.params?.companyData ? route.params?.companyData : null,
  );
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);

  // getting the currently logged in user's data from the firestore collection 'users'
  useEffect(() => {
    fetchUserWithID(currentUserID, setUserData);
  }, []);

  // getting the company's data which belongs to the currently logged in user from the firestore collection 'users'
  useEffect(() => {
    fetchCompanyWithID(userData?.userCompanyID, setCompanyData);
  }, [userData]);

  // filling up the services array with the services which belong to the company the user is connected with:
  useEffect(() => {
    fetchServicesWithCompanyID(companyData?.id, setServices);
  }, [companyData]);

  // filling up the posts array with the posts which belong to the user:
  useEffect(() => {
    fetchPostsWithUserID(userData?.userID, setPosts);
  }, [userData]);

  // when the route params change (e.g. in case of navigation) the user, company, service and post data are refreshed
  // with the new data from route:
  useEffect(() => {
    fetchUserWithID(currentUserID, setUserData);
    fetchCompanyWithID(userData?.userCompanyID, setCompanyData);
    fetchServicesWithCompanyID(companyData?.id, setServices);
    fetchPostsWithUserID(userData?.userID, setPosts);
  }, [route.params]);

  const refreshScreen = async () => {
    fetchUserWithID(currentUserID, setUserData);
    fetchCompanyWithID(userData?.userCompanyID, setCompanyData);
    fetchServicesWithCompanyID(companyData?.id, setServices);
    fetchPostsWithUserID(userData?.userID, setPosts);
  };

  const onCompanyPress = () => {
    navigation.navigate('MyCompanyScreen', { companyData: companyData });
  };

  const onEditPress = () => {
    navigation.navigate('EditUserScreen', { userData: userData, companyData: companyData });
  };

  const onLogoutPress = () => {
    auth.signOut();
  };

  return (
    userData &&
    (!userData?.userHasCompany || companyData) &&
    services &&
    posts && (
      <ProfileScreenTemplate
        navigation={navigation}
        userData={userData}
        companyData={companyData}
        services={services}
        posts={posts}
        onCompanyPress={onCompanyPress}
        onEditPress={onEditPress}
        onLogoutPress={onLogoutPress}
        editAllowed={true}
        refreshScreen={refreshScreen}
        isMyProfileScreen={true}
      />
    )
  );
}
