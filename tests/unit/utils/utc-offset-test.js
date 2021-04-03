import utcOffset from 'dummy/utils/utc-offset';
import { module, test } from 'qunit';

module('Unit | Utility | utc-offset', function () {
  test('it works with DST offset shift', function (assert) {
    const londonOffset = utcOffset('Europe/London');
    const validLondonOffsets = [-60, 0];
    const aucklandOffset = utcOffset('Pacific/Auckland');
    const validAucklandOffsets = [-780, -720];

    assert.ok(validLondonOffsets.includes(londonOffset), 'works for Europe/London DST');
    assert.ok(validAucklandOffsets.includes(aucklandOffset), 'works for Pacific/Auckland');
  });

  test('it works with non-DST countries', function (assert) {
    const niue = utcOffset('Pacific/Niue');
    const dubai = utcOffset('Asia/Dubai');
    const bujumbura = utcOffset('Africa/Bujumbura');

    assert.equal(niue, 660, 'works for Pacific/Niue');
    assert.equal(dubai, -240, 'works for Asia/Dubai');
    assert.equal(bujumbura, -120, 'works for Africa/Bujumbura');
  });
});
