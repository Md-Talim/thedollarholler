/**
 * converts date to indian format
 * @param date the date in YYYY-MM-DD format
 * @returns New date in DD-MM-YYYY format
 */
export const convertDateFormat = (date: string): string => {
  // break apart the date
  const [year, month, day] = date.split('-');

  // return the formatted date
  return `${day} / ${month} / ${year}`;
};
