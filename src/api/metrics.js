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

export const getMetricByType = async (type, onlyQuantityNumber) => {
  const metricTypeRef = firebase.database().ref(`/metrics/${type}`);
  let rows;
  await metricTypeRef
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
    const visitNumber = rowsKeys?.length;
    return visitNumber;
  }

  const rowsArray = rowsKeys.map((row) => rows[row]);

  return rowsArray;
};
