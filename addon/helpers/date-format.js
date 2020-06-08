import { format } from 'date-fns';
import { helper } from '@ember/component/helper';
import normalizeDate from '../utils/normalize-date';
import config from 'ember-get-config';

/**
  Return the formatted date string in the given format.
  @param {Date|String|Number} date original date
  @param {String} outputFormat string of tokens
  @param {String} inputFormat string of tokens
  @param {Object} options object with options
  @return {String} formatted date string
*/
export default helper(function dateFormat(
  [date, outputFormat, inputFormat],
  options = {}
) {
  if (!date) {
    return;
  }

  let normalizedDate = normalizeDate(date, inputFormat);
  let outFormat = outputFormat || config.date.outputFormat;

  return format(normalizedDate, outFormat, options);
});
