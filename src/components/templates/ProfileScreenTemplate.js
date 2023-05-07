import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { auth } from '../../../config/firebase';

// custom component imports:
import Container from '../../components/atoms/display/Container';
import UserInfo from '../../components/molecules/UserInfo';
import UserCounters from '../../components/molecules/UserCounters';
import UserPostList from '../../components/lists/UserPostList';
import ServiceCardList from '../../components/lists/ServiceCardList';
import UserInteractionContainer from '../../components/molecules/UserInteractionContainer';

export default function ProfileScreenTemplate({
  navigation,
  userData,
  companyData,
  services,
  posts,
  onCompanyPress,
  onEditPress,
  onLogoutPress,
  onFollowPress,
  editAllowed,
  isFollowing,
  refreshScreen,
  isMyProfileScreen = false,
}) {
  const currentUserID = auth.currentUser.uid;

  return (
    <Container>
      <ScrollView>
        {!userData && <ActivityIndicator />}
        {userData && (!userData?.userHasCompany || companyData) && (
          <>
            <UserInfo
              userEmail={userData.userEmail}
              userCompanyName={companyData?.companyName}
              userFullName={userData.userFullName}
              userImage={userData.userImage}
              userDescription={userData.userDescription}
              onCompanyPress={onCompanyPress}
            />
            <UserInteractionContainer
              onEditPress={onEditPress}
              onLogoutPress={onLogoutPress}
              onFollowPress={onFollowPress}
              isSelf={currentUserID === userData.userID}
              editAllowed={editAllowed}
              isFollowing={isFollowing}
            />
            <UserCounters
              userLikeCounter={userData.userLikeCounter}
              userFollowerCounter={userData.userFollowerCounter}
              userPostCounter={userData.userPostCounter}
            />
          </>
        )}
        {userData && posts && (
          <UserPostList
            navigation={navigation}
            posts={posts}
            userData={userData}
            companyData={companyData}
            refreshScreen={refreshScreen}
            isMyProfileScreen={isMyProfileScreen}
          />
        )}
        {userData && companyData && companyData.companyName && (
          <ServiceCardList
            navigation={navigation}
            services={services}
            userData={userData}
            companyData={companyData}
            editMode={editAllowed}
          />
        )}
      </ScrollView>
    </Container>
  );
}
