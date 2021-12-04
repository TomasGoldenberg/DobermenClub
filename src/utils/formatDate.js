export const isFuture = (date, toleranceMillis = 0) => {
  const isFuture = date.getTime() > Date.now() + toleranceMillis;
  return isFuture;
};

export const handleZeros = (number) => {
  let string = number.toString();
  const isLessThanTen = string.length === 1;
  string = isLessThanTen ? `0${string}` : string;
  return string;
};
