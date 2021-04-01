import { differenceInDays } from 'date-fns';
import { helper } from '@ember/component/helper';
import normalizeDate from '../utils/normalize-date';

/**
  Return the distance between two given dates, as an integer.
  @param {Date|String|Number} date given date
  @param {Date|String|Number} baseDate given date
  @param {String} inputFormat string of tokens
  @return {Number} difference in days
*/
export default helper(function dateDiffInDays([dateA, dateB, inputFormat]) {
  if (!dateA || !dateB) {
    return;
  }

  let normalizedDateA = normalizeDate(dateA, inputFormat);
  let normalizedDateB = normalizeDate(dateB, inputFormat);

  return Math.abs(differenceInDays(normalizedDateA, normalizedDateB));
});
