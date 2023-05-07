import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { auth, database } from '../../../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

// custom component imports:,
import ActionButton from '../atoms/buttons/ActionButton';
import colors from '../../../colors';
import { fetchUserWithID } from '../../services/fetchData';

export default function Comment({ navigation, commentData, reduceCommentCounter }) {
  const currentUserID = auth.currentUser.uid;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetchUserWithID(commentData.commentUserID, setUserData);
  }, []);

  const onDeletePress = async () => {
    if (commentData?.id) {
      const commentDocRef = doc(database, 'comments', commentData?.id);
      deleteDoc(commentDocRef);

      reduceCommentCounter();
    }
  };

  return (
    userData &&
    commentData && (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Text style={styles.userFullNameText}>{userData.userFullName}</Text>
          {userData.userID == currentUserID && (
            <ActionButton buttonText="Delete comment" onPress={onDeletePress} />
          )}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{commentData.commentDescription}</Text>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingVertical: 7,
    borderRadius: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  userFullNameText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  contentContainer: {
    display: 'flex',
  },
  contentText: {
    fontSize: 13,
    marginVertical: 5,
  },
});
