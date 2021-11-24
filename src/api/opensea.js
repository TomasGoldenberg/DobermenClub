import axios from 'axios';
import { OPENSEA_API_PATH, DEFAULT_ITEMS_LIMIT } from '../config';

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
  console.log(response);
  const { assets } = response.data;
  const collectionAssets = assets.filter(
    (item) => item.collection.slug === collectionSlug
  );
  return collectionAssets;
};
