import axios from 'axios';
import { OPENSEA_API_PATH, DEFAULT_ITEMS_LIMIT } from '../config';

const DOBERMEN_CONTRACT_ADDRESS = '0x495f947276749ce646f68ac8c248420045cb7b5e';

export const getCollection = async (ownerWallet, slug) => {
  const collections = await axios.get(
    `${OPENSEA_API_PATH}/collections?asset_owner=${ownerWallet}&offset=0&limit=300`
  );

  if (!Array.isArray(collections)) {
    return undefined;
  }

  const collection = collections.find((collection) => collection.slug === slug);
  return collection;
};

export const getSingleAsset = async (id) => {
  const { data } = await axios.get(
    `${OPENSEA_API_PATH}/asset/${DOBERMEN_CONTRACT_ADDRESS}/${id}`
  );

  return data;
};

export const getCollectionAssets = async (
  ownerWallet,
  collectionSlug,
  limit
) => {
  const response = await axios.get(
    `${OPENSEA_API_PATH}/assets?owner=${ownerWallet}&order_direction=desc&offset=0&limit=${
      limit || DEFAULT_ITEMS_LIMIT
    }`
  );
  const { assets } = response.data;
  const collectionAssets = assets.filter(
    (item) => item.collection.slug === collectionSlug
  );
  return collectionAssets;
};
