export const getModifier = (itemValue, selectedValue) => {
  if (itemValue === selectedValue) {
    return 'contained';
  }

  return 'outlined';
};
