import React, { useEffect, useState } from 'react';
import { auth, database } from '../../../config/firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// custom component imports:
import ProfileScreenTemplate from '../../components/templates/ProfileScreenTemplate';
import {
  fetchFollowWithUserID,
  fetchPostsWithUserID,
  fetchServicesWithCompanyID,
} from '../../services/fetchData';

export default function ProfileScreen({ navigation, route }) {
  const currentUserID = auth.currentUser.uid;
  const [userData, setUserData] = useState(route.params?.userData);
  const [companyData, setCompanyData] = useState(route.params?.companyData);
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState();
  const [isFollowing, setIsFollowing] = useState(false);

  // filling up the services array with the services which belong to the company the user is connected with:
  useEffect(() => {
    fetchServicesWithCompanyID(companyData?.id, setServices);
  }, [companyData]);

  // filling up the posts array with the posts which belong to the user:
  useEffect(() => {
    fetchPostsWithUserID(userData?.userID, setPosts);
    fetchFollowWithUserID(userData?.userID, currentUserID, setFollow);
  }, [userData]);

  useEffect(() => {
    if (follow?.id) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [follow]);

  // when the route params change (e.g. in case of navigation) the user, company and post data are refreshed
  // with the new data from route:
  useEffect(() => {
    setUserData(route.params?.userData);
    setCompanyData(route.params?.companyData);

    if (route.params?.postData) {
      let currentPosts = posts;
      currentPosts.forEach((post) => {
        if (post.id == route.params?.postData.id) {
          selectedPosts.splice(selectedPosts.indexOf(post), 1);
        }
      });
      selectedPosts.push(route.params?.postData);
      setPosts(selectedPosts);
    }
  }, [route.params]);

  const onCompanyPress = () => {
    navigation.navigate('CompanyScreen', { companyData: companyData });
  };

  const onFollowPress = async () => {
    const userDocRef = doc(database, 'users', userData.id);
    if (isFollowing) {
      const followDocRef = doc(database, 'follows', follow.id);
      await deleteDoc(followDocRef);
      setFollow({});
      setIsFollowing(false);

      await updateDoc(userDocRef, {
        ...userData,
        userFollowerCounter: userData.userFollowerCounter - 1,
      });
      setUserData({ ...userData, userFollowerCounter: userData.userFollowerCounter - 1 });
    } else {
      const collectionRef = collection(database, 'follows');
      await addDoc(collectionRef, {
        followedID: userData.userID,
        followerID: auth.currentUser.uid,
      });
      setIsFollowing(true);

      await updateDoc(userDocRef, {
        ...userData,
        userFollowerCounter: userData.userFollowerCounter + 1,
      });
      setUserData({ ...userData, userFollowerCounter: userData.userFollowerCounter + 1 });
    }
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
        onFollowPress={onFollowPress}
        isFollowing={isFollowing}
      />
    )
  );
}
