import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { auth, database } from '../../../config/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

// custom component imports:
import Container from '../../components/atoms/display/Container';
import Comment from '../organisms/Comment';
import MediumTextInput from '../atoms/inputs/MediumTextInput';
import RoundButton from '../atoms/buttons/RoundButton';
import colors from '../../../colors';
import { fetchCommentsByPostID } from '../../services/fetchData';

export default function CommentsScreenTemplate({ route, comments, refreshScreen }) {
  const currentUserID = auth.currentUser.uid;
  const [postData, setPostData] = useState(route.params?.postData);
  const [currentComments, setCurrentComments] = useState(comments);
  const [commentData, setCommentData] = useState({
    commentUserID: currentUserID,
    commentPostID: route.params?.postData.id,
    commentDescription: '',
  });

  const refreshCurrentScreen = async () => {
    fetchCommentsByPostID(postData.id, setCurrentComments);
  };

  const reduceCommentCounter = async () => {
    // update the comment counter of the post within the database
    const postDocRef = doc(database, 'posts', postData.id);
    await updateDoc(postDocRef, {
      ...postData,
      postCommentCounter: postData.postCommentCounter - 1,
    });
    setPostData({
      ...postData,
      postCommentCounter: postData.postCommentCounter - 1,
    });
    refreshCurrentScreen();
    refreshScreen();
  };

  const onAddCommentPress = async () => {
    console.log(commentData);
    // checking if the required fields are filled:
    if (commentData.commentDescription == '') {
      alert('Please fill in every field!');
      return;
    }

    // add the created comment to the firestore collection 'comments'
    const collectionRef = collection(database, 'comments');
    await addDoc(collectionRef, {
      commentUserID: commentData.commentUserID,
      commentPostID: commentData.commentPostID,
      commentDescription: commentData.commentDescription,
    }).catch((error) => {
      alert(error);
    });
    setCommentData({ ...commentData, commentDescription: '' });

    // update the comment counter of the post within the database
    const postDocRef = doc(database, 'posts', postData.id);
    await updateDoc(postDocRef, {
      ...postData,
      postCommentCounter: postData.postCommentCounter + 1,
    });
    setPostData({
      ...postData,
      postCommentCounter: postData.postCommentCounter + 1,
    });
    refreshCurrentScreen();
    refreshScreen();
  };

  return (
    <Container>
      {currentComments?.length > 0 ? (
        <FlatList
          data={currentComments}
          renderItem={(currentItem) => (
            <Comment commentData={currentItem.item} reduceCommentCounter={reduceCommentCounter} />
          )}
        />
      ) : (
        <View style={styles.noCommentContainer}>
          <Text style={styles.noCommentText}>There is nothing to display yet.</Text>
          <Text style={styles.noCommentTextSmall}>Be the first one to comment on this post!</Text>
        </View>
      )}
      <View style={styles.addCommentContainer}>
        <MediumTextInput
          placeholder="Add your comment here!"
          value={commentData}
          onChangeText={(text) => setCommentData({ ...commentData, commentDescription: text })}
        />
        <View style={{ marginLeft: 6 }}>
          <RoundButton
            iconName="send-outline"
            size={22}
            background={colors.primaryLight}
            onPress={onAddCommentPress}
          />
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  noCommentContainer: {
    padding: 30,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
  },
  noCommentText: {
    fontWeight: 'bold',
  },
  noCommentTextSmall: {
    fontSize: 12,
    marginTop: 3,
  },
  addCommentContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
