import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { firebaseConfig } from '../config';
import { getIpLocation } from '../utils/getIpLocation';

firebase.initializeApp(firebaseConfig);
export const LOGnewVisit = async (ip, promoterId, tokenId, type) => {
  const parsedIp = ip.replace(/\./g, '');
  const newMetricsRef = firebase.database().ref(`/metrics/${type}/${parsedIp}`);
  let ipDoesExist;
  let country = 'NONE';
  let state = 'NONE';
  let city = 'NONE';
  await newMetricsRef.once('value').then((snap) => (ipDoesExist = snap.val()));

  if (!ipDoesExist) {
    try {
      const { data } = await getIpLocation(ip);

      country = data.country;
      state = data.region;
      city = data.city;
    } catch (error) {
      console.log(error);
      console.log(error.response);
      country = 'NONE';
      state = 'NONE';
      city = 'NONE';
    }
  }

  const newMetric = ipDoesExist
    ? {
        ip,
        promoter: promoterId === ipDoesExist.promoter ? promoterId : 'BOTH',
        type: type.toUpperCase(),
        tokenId,
        times_visited: ipDoesExist.times_visited + 1,
        updated_at: new Date().toISOString(),
        created_at: ipDoesExist.created_at,
        country: ipDoesExist.country,
        state: ipDoesExist.state,
        city: ipDoesExist.city
      }
    : {
        ip,
        promoter: promoterId,
        tokenId,
        type: type.toUpperCase(),
        times_visited: 1,
        created_at: new Date().toISOString(),
        country,
        state,
        city
      };
  newMetricsRef.set(newMetric);

  return newMetric;
};
