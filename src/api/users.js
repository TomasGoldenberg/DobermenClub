import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export const getUserByUid = async (uid) => {
  const user = await firebase
    .database()
    .ref(`users/${uid}`)
    .once('value')
    .then((snap) => snap.val());

  return user;
};
