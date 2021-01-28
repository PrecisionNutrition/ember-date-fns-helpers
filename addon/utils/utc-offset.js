import { differenceInMinutes } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

/**
 * @param {string} IANA Timezone label, e.g. "Europe/London"
 *
 * @return {number} the offset from UTC in minutes. Recall that positive is
 *   behind UTC, and negative is ahead.
 *
 * @see http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export default function utcOffset(ianaTimezone) {
  const now = new Date();
  const localOffsetInMinutes = now.getTimezoneOffset();

  const nowInUtc = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const nowInTz = utcToZonedTime(nowInUtc, ianaTimezone);

  const offsetBetweenLocalAndTz = differenceInMinutes(nowInUtc, nowInTz);

  return (localOffsetInMinutes + offsetBetweenLocalAndTz);
}
