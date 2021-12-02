import axios from 'axios';

const API_KEY = '3563544d-57a8-474d-b56c-4c4d61920d34';
export const getIpLocation = async (ip) => {
  const response = await axios.get(
    `https://api.ipfind.com/?ip=${ip}&auth=${API_KEY}`
  );
  return response;
};
