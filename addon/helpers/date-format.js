import Helper from '@ember/component/helper';
import { format, utcToZonedTime } from 'date-fns-tz';
import normalizeDate from '../utils/normalize-date';
import { getOwner } from '@ember/application';

/**
  Return the formatted date string in the given format.
  @param {Date|String|Number} date original date
  @param {String} outputFormat string of tokens
  @param {String} inputFormat string of tokens
  @param {Object} options object with options
  @return {String} formatted date string
*/
export default class DateFormat extends Helper {
  get defaultOutputFormat() {
    const config = getOwner(this).resolveRegistration('config:environment');

    return config.date.outputFormat;
  }

  compute([date, outputFormat, inputFormat], options = {}) {
    if (!date) {
      return;
    }

    let normalizedDate = normalizeDate(date, inputFormat);
    const outFormat = outputFormat || this.defaultOutputFormat;

    if (options.timeZone) {
      normalizedDate = utcToZonedTime(normalizedDate, options.timeZone);
    }

    return format(normalizedDate, outFormat, options);
  }
}
