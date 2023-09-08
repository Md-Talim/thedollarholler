import { format, isBefore } from 'date-fns';

export const today = format(new Date(), 'yyyy-MM-dd');

/**
 * Converts date to indian format
 * @param {string} date the date in YYYY-MM-DD format
 * @returns {string} New date in DD-MM-YYYY format
 */
export const convertDateFormat = (date: string): string => {
  // break apart the date
  const [year, month, day] = splitDate(date);

  // return the formatted date
  return `${day} / ${month} / ${year}`;
};

/**
 * Takes a date in YYYY-MM-DD format and splits it into an array
 * @param {string} date
 * @returns {Array} [year, month, date]
 */
export const splitDate = (date: string): string[] => {
  return date.split('-');
};

/**
 * Determines whether the due date is late or not
 * @param {string} date the date in YYYY-MM-DD format
 * @returns {boolean} whether it is late or not
 */
export const isLate = (date: string): boolean => {
  // break apart the date
  const [year, month, day] = splitDate(date);

  const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();

  return isBefore(dueDate, today);
};
