import { isFuture as _isFuture } from 'date-fns';
import { helper } from '@ember/component/helper';

export default helper(function isFuture([date]) {
  return !!date && _isFuture(date);
});
