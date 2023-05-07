import React, { useEffect, useState } from 'react';
import { auth } from '../../../config/firebase';

// Custom component imports
import Container from '../../components/atoms/display/Container';
import HomePostList from '../../components/lists/HomePostList';
import FloatingButton from '../../components/atoms/buttons/FloatingButton';
import {
  fetchUserWithID,
  fetchCompanyWithID,
  fetchFollowedByUserID,
  fetchPostsWithUserIDs,
} from '../../services/fetchData';

export default function HomeScreen({ navigation, route }) {
  const currentUserID = auth.currentUser.uid;
  const [follows, setFollows] = useState([]);
  const [posts, setPosts] = useState([]);

  // the currently logged in user's data from firestore collection 'users' is stored in this object:
  const [userData, setUserData] = useState(route.params?.userData ? route.params?.userData : null);
  // the company that belongs to the currently logged in user is stored in this object:
  const [companyData, setCompanyData] = useState(
    route.params?.companyData ? route.params?.companyData : null,
  );

  // finding the users' IDs who are followed by the currently logged in user
  useEffect(() => {
    fetchFollowedByUserID(currentUserID, setFollows);
  }, []);

  // filling up the posts array from firestore:
  useEffect(() => {
    const followedUserIDs = [];
    follows.forEach((follow) => {
      followedUserIDs.push(follow.followedID);
    });
    fetchPostsWithUserIDs(followedUserIDs, setPosts);
  }, [follows]);

  // finding the currently logged in user's data within the users array:
  useEffect(() => {
    fetchUserWithID(currentUserID, setUserData);
  }, []);

  // finding the company that belongs to the currently logged within the companies array:
  useEffect(() => {
    fetchCompanyWithID(userData?.userCompanyID, setCompanyData);
  }, [userData]);

  // Navigating to the AddPostScreen when clicking on the floating button
  const onAddPress = () => {
    navigation.navigate('EditPostScreen', { userData: userData, companyData: companyData });
  };

  return (
    <Container>
      <HomePostList posts={posts} navigation={navigation} />
      <FloatingButton iconName="add" size={44} onPress={onAddPress} />
    </Container>
  );
}
