/* export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}; */
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAvedc1gDdsrM1LTEG6mBwaPvnAnWkM8ns',
  authDomain: 'thedobermenclub.firebaseapp.com',
  projectId: 'thedobermenclub',
  storageBucket: 'thedobermenclub.appspot.com',
  messagingSenderId: '619714976605',
  appId: '1:619714976605:web:23c034dc1bf71f9c77e6b4'
};

export const cloudinaryConfig = {
  cloudinaryKey: process.env.REACT_APP_CLOUDINARY_KEY,
  cloudinaryPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
  cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;
export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
export const OPENSEA_API_PATH = 'https://api.opensea.io/api/v1';
export const DOBERMEN_ADDRESS = '0x5a269d4f701AFC3FBB0Da437B4EC3e8D1dBf086C';
export const DOBERMEN_SLUG = 'thedobermenclub';
export const DEFAULT_ITEMS_LIMIT = '3';
