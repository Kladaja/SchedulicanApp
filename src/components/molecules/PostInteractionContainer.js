import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { auth, database } from '../../../config/firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

// custom component imports:
import ReactionButton from '../atoms/buttons/ReactionButton';
import ActionButton from '../atoms/buttons/ActionButton';
import { fetchCommentsByPostID, fetchLikesForPostByUserID } from '../../services/fetchData';

export default function PostInteractionContainer({
  navigation,
  postData,
  userData,
  companyData,
  editMode = false,
  refreshScreen,
  isMyProfileScreen,
}) {
  const [currentPostData, setCurrentPostData] = useState(postData);
  const [like, setLike] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchLikesForPostByUserID(postData.id, auth.currentUser.uid, setLike);
  }, []);

  useEffect(() => {
    if (like?.id) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [like]);

  useEffect(() => {
    fetchCommentsByPostID(currentPostData.id, setComments);
  }, [currentPostData]);

  const onLikePress = async () => {
    console.log(`isLiked before: ${isLiked}, like before: ${like}`);
    const postDocRef = doc(database, 'posts', currentPostData.id);

    if (isLiked) {
      const likeDocRef = doc(database, 'likes', like.id);
      await deleteDoc(likeDocRef);
      setLike({});
      setIsLiked(false);

      await updateDoc(postDocRef, {
        ...currentPostData,
        postLikeCounter: currentPostData.postLikeCounter - 1,
      });
      setCurrentPostData({
        ...currentPostData,
        postLikeCounter: currentPostData.postLikeCounter - 1,
      });
    } else {
      const collectionRef = collection(database, 'likes');
      await addDoc(collectionRef, {
        likeUserID: auth.currentUser.uid,
        likePostID: currentPostData.id,
      });
      setIsLiked(true);

      await updateDoc(postDocRef, {
        ...currentPostData,
        postLikeCounter: currentPostData.postLikeCounter + 1,
      });
      setCurrentPostData({
        ...currentPostData,
        postLikeCounter: currentPostData.postLikeCounter + 1,
      });
    }
    console.log(`isLiked after: ${isLiked}, like after: ${like}`);
  };

  const onCommentPress = () => {
    if (isMyProfileScreen) {
      navigation.navigate('MyCommentsScreen', {
        postData: postData,
        userData: userData,
        comments: comments,
        refreshScreen: refreshScreen,
      });
    } else {
      navigation.navigate('CommentsScreen', {
        postData: postData,
        userData: userData,
        comments: comments,
        refreshScreen: refreshScreen,
      });
    }
  };

  const onApplyPress = () => {
    console.log('Apply pressed');
  };

  const onEditPress = () => {
    navigation.navigate('EditPostScreen', {
      postData: postData,
      userData: userData,
      companyData: companyData,
    });
  };

  const actionButton = editMode ? (
    <ActionButton buttonText="Edit" onPress={onEditPress} />
  ) : (
    <ActionButton buttonText="Apply" onPress={onApplyPress} />
  );

  return (
    currentPostData && (
      <View style={styles.container}>
        <ReactionButton
          iconName="heart-outline"
          size={20}
          buttonText={`${currentPostData.postLikeCounter}`}
          onPress={onLikePress}
          isActive={isLiked}
        />
        <ReactionButton
          iconName="chatbubbles-outline"
          size={20}
          buttonText={`${currentPostData.postCommentCounter}`}
          onPress={onCommentPress}
        />
        {actionButton}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
