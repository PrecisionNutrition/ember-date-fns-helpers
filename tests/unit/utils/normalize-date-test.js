import normalizeDate from '@precision-nutrition/ember-date-fns-helpers/utils/normalize-date';
import { module, test } from 'qunit';
import { isEqual } from 'date-fns';

module('Unit | Utility | normalize-date', function () {
  test('handles non-string value by returning it', function (assert) {
    let date = new Date();
    let result = normalizeDate(date);

    assert.equal(result, date);
  });

  test('handles string without inputFormat', function (assert) {
    let dateString = '2018-10-03T10:00';
    let result = normalizeDate(dateString);

    assert.ok(isEqual(result, new Date('2018-10-03T10:00')));
  });

  test('handles string with inputFormat', function (assert) {
    let result = normalizeDate('3/5/10', 'd/M/yy');

    assert.ok(isEqual(result, new Date('2010-05-03T00:00')));
  });
});
