export const getNftRarety = (traits) =>
  traits.find((asset, index) => asset.trait_type === 'RARETY')?.value;

export const getNftTraitType = (traits, type) => {
  const typeList = traits.filter((asset, index) => asset.trait_type === type);

  return typeList;
};
