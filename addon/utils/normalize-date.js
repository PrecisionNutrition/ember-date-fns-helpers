import { parse } from 'date-fns';

export default function normalizeDate(date, inputFormat) {
  if (typeof date !== 'string') {
    return date;
  }

  return inputFormat
    ? parse(date, inputFormat, new Date())
    : new Date(date);
}
