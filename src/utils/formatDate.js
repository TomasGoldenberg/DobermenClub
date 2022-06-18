import { MONTHS } from '../constants/dates';

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

export const getWeekNumber = (date) => {
  const currentdate = date;
  const oneJan = new Date(currentdate.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (currentdate - oneJan) / (24 * 60 * 60 * 1000)
  );
  const result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

  return result;
};

export const isToday = (dateToCheck) => {
  const today = new Date();
  const isToday =
    dateToCheck.getDate() === today.getDate() &&
    dateToCheck.getMonth() === today.getMonth() &&
    dateToCheck.getFullYear() === today.getFullYear();
  return isToday;
};

export const validateSearchTimeUnit = (searchTimeUnit, visitDate) => {
  if (!visitDate) {
    return false;
  }
  // MONTH CONDITION
  const currentMonth = MONTHS[new Date().getMonth()];
  const month = MONTHS[visitDate?.getMonth()];
  const isThisMonth = month === currentMonth;

  // WEEK CONDITION
  const currentWeekNumber = getWeekNumber(new Date());
  const visitWeekNumber = getWeekNumber(visitDate);
  const isThisWeek = currentWeekNumber === visitWeekNumber;

  // DAY CONDITION
  const isTodayDate = isToday(visitDate);

  const timeUnitConditions = {
    MONTH: isThisMonth,
    WEEK: isThisWeek,
    DAY: isTodayDate
  };

  const meetsSearchTimeUnit = timeUnitConditions[searchTimeUnit];
  return meetsSearchTimeUnit;
};
