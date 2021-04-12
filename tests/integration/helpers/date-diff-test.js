import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { format, addDays, subDays } from 'date-fns';

module('Integration | Helper | date-diff', function (hooks) {
  setupRenderingTest(hooks);

  test('diff-ing 2 dates', async function (assert) {
    this.setProperties({
      dateA: subDays(new Date(), 2),
      dateB: addDays(new Date(), 2),
    });

    await render(hbs`{{date-diff this.dateA this.dateB}}`);

    assert.equal(this.element.textContent.trim(), '4');
  });

  test('the returned diff is always positive integer, regardless of which date is compared first', async function (assert) {
    this.setProperties({
      dateA: subDays(new Date(), 3),
      dateB: addDays(new Date(), 2),
    });

    await render(hbs`{{date-diff this.dateA this.dateB}}`);

    assert.equal(this.element.textContent.trim(), '5');

    await render(hbs`{{date-diff this.dateB this.dateA}}`);

    assert.equal(this.element.textContent.trim(), '5');
  });

  test('the two given dates can be ISO strings', async function (assert) {
    this.setProperties({
      dateA: subDays(new Date(), 3).toISOString(),
      dateB: addDays(new Date(), 3).toISOString(),
    });

    await render(hbs`{{date-diff this.dateA this.dateB}}`);
    assert.equal(this.element.textContent.trim(), '6');
  });

  test('the two given dates can be in string format, if a format string arg is provided', async function (assert) {
    this.setProperties({
      dateA: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      dateB: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    });

    await render(hbs`{{date-diff this.dateA this.dateB inputFormat="yyyy-MM-dd"}}`);

    assert.equal(this.element.textContent.trim(), '7');
  });

  test('can return different precisions', async function (assert) {
    this.setProperties({
      dateA: new Date(),
      dateB: addDays(new Date(), 1),
      dateC: addDays(new Date(), 730),
    });

    await render(hbs`{{date-diff this.dateA this.dateC precision="years"}}`);

    assert.equal(this.element.textContent.trim(), '2');

    await render(hbs`{{date-diff this.dateA this.dateB precision="days"}}`);

    assert.equal(this.element.textContent.trim(), '1');

    await render(hbs`{{date-diff this.dateA this.dateB precision="hours"}}`);

    assert.equal(this.element.textContent.trim(), '24');

    await render(hbs`{{date-diff this.dateA this.dateB precision="minutes"}}`);

    assert.equal(this.element.textContent.trim(), '1440');

    await render(hbs`{{date-diff this.dateA this.dateB precision="seconds"}}`);

    assert.equal(this.element.textContent.trim(), '86400');

    await render(hbs`{{date-diff this.dateA this.dateB precision="foobars"}}`);

    assert.equal(this.element.textContent.trim(), '1', 'default is in "days"');
  });

  test('renders nothing with no args', async function (assert) {
    await render(hbs`{{date-diff}}`);
    assert.equal(this.element.textContent, '');
  });
});
