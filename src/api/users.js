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

export const getAllUsers = async (onlyQuantityNumber) => {
  const usersRef = firebase.database().ref(`/users`);
  let rows;
  await usersRef
    .once('value')
    .then((snap) => {
      rows = snap.val();
    })
    .catch((e) => console.log(e));

  if (!rows) {
    return 0;
  }
  const rowsKeys = Object.keys(rows);

  if (onlyQuantityNumber) {
    const usersNumber = rowsKeys?.length;
    return usersNumber;
  }

  const rowsArray = rowsKeys.map((row) => rows[row]);

  return rowsArray;
};
