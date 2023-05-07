import React from 'react';
import { View, FlatList } from 'react-native';

// Custom component imports
import UserPostCard from '../organisms/UserPostCard';

export default function UserPostList({
  posts,
  userData,
  companyData,
  editMode = false,
  navigation,
  refreshScreen,
  isMyProfileScreen,
}) {
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={(currentItem) => (
          <UserPostCard
            navigation={navigation}
            postData={currentItem.item}
            userData={userData}
            companyData={companyData}
            editMode={editMode}
            refreshScreen={refreshScreen}
            isMyProfileScreen={isMyProfileScreen}
          />
        )}
      />
    </View>
  );
}
