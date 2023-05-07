import { database } from '../../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// getting the users from the firestore collection 'users':
export const fetchUsers = async (setUsers = () => {}) => {
  await getDocs(collection(database, 'users')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(newData);
  });
};

// getting a user with a specific id from the firestore collection 'users':
export const fetchUserWithID = async (userID, setUser = () => {}) => {
  await getDocs(collection(database, 'users')).then((querySnapshot) => {
    // the id of the user objects is the same as it is in firestore:
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.find((user) => user.userID === userID);
    setUser(result);
  });
};

// getting a user for a company with a specific id from the firestore collection 'users':
export const fetchUserForCompany = async (companyID, setUsers = () => {}) => {
  await getDocs(collection(database, 'users')).then((querySnapshot) => {
    // the id of the user objects is the same as it is in firestore:
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.filter((user) => user.userCompanyID === companyID);
    setUsers(result);
  });
};

// getting the companies from the firestore collection 'companies':
export const fetchCompanies = async (setCompanies = () => {}) => {
  await getDocs(collection(database, 'companies')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setCompanies(newData);
  });
};

// getting a company with a specific id from the firestore collection 'companies':
export const fetchCompanyWithID = async (companyID, setCompany = () => {}) => {
  await getDocs(collection(database, 'companies')).then((querySnapshot) => {
    // the id of the company objects is the same as it is in firestore:
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.find((company) => company.id === companyID);
    setCompany(result);
  });
};

// getting the services from the firestore collection 'services':
export const fetchServices = async (setServices = () => {}) => {
  await getDocs(collection(database, 'services')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setServices(newData);
  });
};

// getting a service with a specific company id from the firestore collection 'services':
export const fetchServicesWithCompanyID = async (companyID, setServices = () => {}) => {
  await getDocs(collection(database, 'services')).then((querySnapshot) => {
    // the company id of the service objects is the same as it is in firestore:
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.filter((service) => service.serviceCompanyID === companyID);
    setServices(result);
  });
};

// getting the posts from the firestore collection 'posts':
export const fetchPosts = async (setPosts = () => {}) => {
  await getDocs(collection(database, 'posts')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPosts(newData);
  });
};

// getting a post with a specific user id from the firestore collection 'posts':
export const fetchPostsWithUserID = async (userID, setPosts = () => {}) => {
  await getDocs(collection(database, 'posts')).then((querySnapshot) => {
    // the id of the service objects is the same as it is in firestore:
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.filter((post) => post.postUserID === userID);
    setPosts(result);
  });
};

// getting a post with the given list of user id from the firestore collection 'posts':
export const fetchPostsWithUserIDs = async (userIDs, setPosts = () => {}) => {
  await getDocs(query(collection(database, 'posts'), where('postUserID', 'in', userIDs))).then(
    (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(newData);
    },
  );
};

// getting the list of userIDs followed by the given userID from the firestore collection 'follows':
export const fetchFollowedByUserID = async (userID, setFollowedUsers = () => {}) => {
  await getDocs(collection(database, 'follows')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.filter((follow) => follow.followerID === userID);
    setFollowedUsers(result);
  });
};

// getting the follow data between the given two users from the firestore collection 'follows':
export const fetchFollowWithUserID = async (followedID, followerID, setFollow = () => {}) => {
  await getDocs(collection(database, 'follows')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.find(
      (follow) => follow.followerID === followerID && follow.followedID === followedID,
    );
    setFollow(result);
  });
};

// getting the follow data between the given two users from the firestore collection 'follows':
export const fetchLikesForPostByUserID = async (postID, userID, setLike = () => {}) => {
  await getDocs(collection(database, 'likes')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.filter((like) => like.likePostID == postID && like.likeUserID == userID);
    setLike(result[0]);
  });
};

// getting the comments for a post by the post's ID from the firestore collection 'comments':
export const fetchCommentsByPostID = async (postID, setComments = () => {}) => {
  await getDocs(collection(database, 'comments')).then((querySnapshot) => {
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = newData.filter((comment) => comment.commentPostID == postID);
    setComments(result);
  });
};
