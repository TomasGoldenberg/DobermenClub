import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { firebaseConfig } from '../config';

firebase.initializeApp(firebaseConfig);
export const login = (email, password) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userAuth) => {
      const { user } = userAuth;
      return user;
      // redux login
    })
    .catch((e) => {
      throw e;
    });

export const register = (user) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((userAuth) => {
      const { user } = userAuth;

      return user;
    })
    .catch((e) => {
      throw e;
    });

export const saveNewUser = async (user) => {
  const newUserRef = firebase.database().ref(`/users/${user.uid}`);
  await newUserRef.set(user);
  return user;
};
