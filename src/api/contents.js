import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export const getSectionContent = async (requestedSection) => {
  const contentsRef = firebase.database().ref(`/contents/${requestedSection}`);
  let section;

  await contentsRef.once('value').then((snap) => {
    section = snap.val();
  });

  console.log(section);

  return section;
};
