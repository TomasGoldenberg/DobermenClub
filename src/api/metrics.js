import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { firebaseConfig } from '../config';
import { getIpLocation } from '../utils/getIpLocation';
import { handleZeros, validateSearchTimeUnit } from '../utils/formatDate';
import { MONTHS } from '../constants/dates';

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

export const getAllVisits = async () => {
  const externalVisitsRef = firebase.database().ref(`/metrics/visits`);
  const homeVisitsRef = firebase.database().ref(`/metrics/home_visits`);
  let homeVisits = {};
  let externalVisits = {};

  try {
    await externalVisitsRef.once('value').then((snap) => {
      externalVisits = snap.val();
    });
    await homeVisitsRef.once('value').then((snap) => {
      homeVisits = snap.val();
    });
  } catch (error) {
    console.log(error);
  }

  const allVisits = {
    ...homeVisits,
    ...externalVisits
  };

  return allVisits;
};

export const getVisitsCountries = async (timeUnit) => {
  const allVisits = await getAllVisits();

  const visits = Object.keys(allVisits).map((visitId) => allVisits[visitId]);

  let countries = {};

  visits.forEach((visit) => {
    const country = visit.country || 'NONE';
    const date = new Date(visit.created_at);
    const meetsSearchTimeUnit = validateSearchTimeUnit(timeUnit, date);
    if (!meetsSearchTimeUnit) {
      return;
    }

    countries = {
      ...countries,
      [country]: countries[country] + 1 || 1
    };
  });

  const countryList = Object.keys(countries);
  const valueList = Object.values(countries);
  return {
    countries: countryList,
    values: valueList
  };
};

export const getMetricsByOrigin = async (timeUnit) => {
  const allVisits = await getAllVisits();

  const visits = Object.keys(allVisits).map((visitId) => allVisits[visitId]);

  const promoters = {
    name: 'Promoters',
    type: 'area', // line
    data: []
  };

  const organic = {
    name: 'Organic',
    type: 'area',
    data: []
  };

  const example = {
    name: 'Team C',
    type: 'column',
    data: []
  };

  let dates = {};

  visits.forEach((item) => {
    const date = new Date(item.created_at);
    const meetsSearchTimeUnit = validateSearchTimeUnit(timeUnit, date);
    if (!date || !meetsSearchTimeUnit) {
      return;
    }
    const isOrganic = item.promoter === 'NONE';
    const day = date.getDate();
    const month = MONTHS[date?.getMonth()];
    const dateItemLabel = `${month}, ${handleZeros(day)}`;

    const existingValue = dates[dateItemLabel] || {};
    const existingOrganicValue = existingValue.organic || 0;
    const existingPromoterValue = existingValue.promoter || 0;

    const dateItemValues = {
      label: dateItemLabel,
      organic: isOrganic ? existingOrganicValue + 1 : existingOrganicValue,
      promoter: !isOrganic ? existingPromoterValue + 1 : existingPromoterValue
    };

    dates = {
      ...dates,
      [dateItemLabel]: dateItemValues
    };
  });

  const datesKeysRaw = Object.keys(dates);

  const datesWithOrder = datesKeysRaw.map((string) => {
    const date = new Date(string);
    const order = `${date.getMonth()}${date.getDate()}`;
    return {
      date: string,
      order
    };
  });
  datesWithOrder.sort((a, b) => a.order - b.order);

  const datesKeys = datesWithOrder.map((item) => item.date);

  const datesArray = datesKeys.map((dateLabel) => dates[dateLabel]);

  datesArray.forEach((date) => {
    organic.data.push(date.organic);
    promoters.data.push(date.promoter);
    example.data.push(0.1);
  });

  const result = {
    labels: datesKeys,
    data: [promoters, organic, example]
  };
  return result;
};
