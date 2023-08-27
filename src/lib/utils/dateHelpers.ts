import { isBefore } from 'date-fns';

/**
 * converts date to indian format
 * @param date the date in YYYY-MM-DD format
 * @returns New date in DD-MM-YYYY format
 */
export const convertDateFormat = (date: string): string => {
  // break apart the date
  const [year, month, day] = splitDate(date);

  // return the formatted date
  return `${day} / ${month} / ${year}`;
};

export const splitDate = (date: string): string[] => {
  return date.split('-');
};

/**
 * checks whether the due date is late or not
 * @param date the date in YYYY-MM-DD format
 * @returns whether it is late or not
 */
export const isLate = (date: string): boolean => {
  // break apart the date
  const [year, month, day] = splitDate(date);

  const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();

  return isBefore(dueDate, today);
};
