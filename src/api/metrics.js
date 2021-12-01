import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { firebaseConfig } from '../config';

firebase.initializeApp(firebaseConfig);
export const LOGnewVisit = async (ip, promoterId, tokenId, type) => {
  const parsedIp = ip.replace(/\./g, '');
  const newMetricsRef = firebase.database().ref(`/metrics/${type}/${parsedIp}`);
  let ipDoesExist;
  await newMetricsRef.once('value').then((snap) => (ipDoesExist = snap.val()));

  const newMetric = ipDoesExist
    ? {
        ip,
        promoter: promoterId,
        type: type.toUpperCase(),
        tokenId,
        times_visited: ipDoesExist.times_visited + 1,
        updated_at: new Date().toISOString(),
        created_at: ipDoesExist.created_at
      }
    : {
        ip,
        promoter: promoterId,
        tokenId,
        type: type.toUpperCase(),
        times_visited: 1,
        created_at: new Date().toISOString()
      };
  newMetricsRef.set(newMetric);

  return newMetric;
};
