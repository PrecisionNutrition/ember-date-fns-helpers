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
  @param {Object} precision a unit of precision for the return value
  @return {Number} a positive integer representing the difference
*/
export default helper(function dateDiff([dateA, dateB, inputFormat], { precision = 'days' }) {
  if (!dateA && !dateB) return;

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
