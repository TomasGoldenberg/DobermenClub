export const isFuture = (date, toleranceMillis = 0) => {
  const isFuture = date.getTime() > Date.now() + toleranceMillis;
  return isFuture;
};
