import { helper } from '@ember/component/helper';
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import normalizeDate from '../utils/normalize-date';

/**
  Return the difference between two given dates as a number.
  If you want a formatted response, see: date-format or date-from-now

  @param {Date|String|Number} dateA given date
  @param {Date|String|Number} dateB given date
  @param {String} inputFormat string of tokens representing a date format
  @param {String} precision a unit of precision for the return value
  @return {Number|Null} a positive integer representing the difference, or null if invalid
*/
export default helper(function dateDiff([dateA, dateB], { precision = 'days', inputFormat }) {
  if (!dateA || !dateB) return null;

  const normalizedDateA = normalizeDate(dateA, inputFormat);
  const normalizedDateB = normalizeDate(dateB, inputFormat);

  let difference;

  switch (precision) {
    case 'days':
      difference = differenceInDays(normalizedDateA, normalizedDateB);
      break;
    case 'hours':
      difference = differenceInHours(normalizedDateA, normalizedDateB);
      break;
    case 'minutes':
      difference = differenceInMinutes(normalizedDateA, normalizedDateB);
      break;
    case 'seconds':
      difference = differenceInSeconds(normalizedDateA, normalizedDateB);
      break;
    default:
      difference = differenceInDays(normalizedDateA, normalizedDateB);
  }

  return Math.abs(difference);
});
