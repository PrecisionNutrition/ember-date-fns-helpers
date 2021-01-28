import utcOffset from 'dummy/utils/utc-offset';
import { module, test } from 'qunit';

module('Unit | Utility | utc-offset', function () {
  test('it works', function (assert) {
    const utc0 = 'Europe/London';
    const utcPos11 = 'Pacific/Niue';
    const utcNeg4 = 'Asia/Dubai';
    const utcNeg2 = 'Africa/Bujumbura';

    assert.equal(utcOffset(utc0), 0, 'works for Europe/London');

    assert.equal(utcOffset(utcPos11), 660, 'works for Pacific/Niue');

    assert.equal(utcOffset(utcNeg4), -240, 'works for Asia/Dubai');

    assert.equal(utcOffset(utcNeg2), -120, 'works for Africa/Bujumbura');
  });
});
