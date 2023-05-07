import React from 'react';
import { StyleSheet, RefreshControl, View, FlatList, Text } from 'react-native';

// custom component imports:
import HomePostCard from '../organisms/HomePostCard';

export default function HomePostList({ posts, navigation }) {
  return (
    <View>
      {posts?.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={(currentItem) => (
            <HomePostCard postData={currentItem.item} navigation={navigation} />
          )}
        />
      ) : (
        <View style={styles.noPostContainer}>
          <Text style={styles.noPostText}>There is nothing to display yet.</Text>
          <Text style={styles.noPostTextSmall}>Please come back later!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noPostContainer: {
    padding: 30,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
  },
  noPostText: {
    fontWeight: 'bold',
  },
  noPostTextSmall: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
