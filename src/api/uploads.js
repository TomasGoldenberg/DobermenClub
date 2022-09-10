import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/database';
import 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { firebaseConfig, IMAGE_HOST_API_KEY } from '../config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const uploadNews = async (newItem) => {
  const id = uuidv4();
  const newItemRef = firebase.database().ref(`/news/${id}`);
  await newItemRef.set({ id, ...newItem });
};

export const postImage = async (image) => {
  const body = new FormData();
  body.set('key', IMAGE_HOST_API_KEY);
  body.append('image', image);

  const response = await axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: body
  });
  return response.data.data;
};

export const getNews = async () => {
  const contentsRef = firebase.database().ref(`/news`);
  const news = [];

  await contentsRef.once('value').then((snap) => {
    const newsObject = snap.val();
    Object.keys(newsObject).forEach((newsId) => {
      const currentItem = newsObject[newsId];
      news.push(currentItem);
    });
  });

  return news;
};

export const deleteNews = async (newsId) => {
  const newsRef = firebase.database().ref(`/news/${newsId}`);
  await newsRef.remove();
};
