import { formatDistanceToNow } from 'date-fns';
import { helper } from '@ember/component/helper';
import normalizeDate from '../utils/normalize-date';

// `addSuffix` specifies if it's earlier or later (e.g. 3 days "ago", "in" 3 days)
const defaultOptions = {
  addSuffix: true,
};

/**
  Return the distance between the given date and now in words.
  @param {Date|String|Number} date given date
  @param {String} inputFormat string of tokens
  @param {Object} options object with options
  @return {String} distance in words
*/
export default helper(function dateFromNow([date, inputFormat], customOptions = {}) {
  if (!date) {
    return;
  }

  let normalizedDate = normalizeDate(date, inputFormat);
  let options = { ...defaultOptions, ...customOptions };

  return formatDistanceToNow(normalizedDate, options);
});
