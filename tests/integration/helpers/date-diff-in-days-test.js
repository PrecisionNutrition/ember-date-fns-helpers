import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { addDays, subDays, format } from 'date-fns';

module('Integration | Helper | date-diff-in-days', function (hooks) {
  setupRenderingTest(hooks);

  test('diff-ing 2 dates', async function (assert) {
    this.setProperties({
      dateA: subDays(new Date(), 2),
      dateB: addDays(new Date(), 2),
    });

    await render(hbs`{{date-diff-in-days this.dateA this.dateB}}`);

    assert.equal(this.element.textContent.trim(), '4');
  });

  test('the returned diff is always positive integer, regardless of which date is compared first', async function (assert) {
    this.setProperties({
      dateA: subDays(new Date(), 3),
      dateB: addDays(new Date(), 2),
    });

    await render(hbs`{{date-diff-in-days this.dateA this.dateB}}`);

    assert.equal(this.element.textContent.trim(), '5');

    await render(hbs`{{date-diff-in-days this.dateB this.dateA}}`);

    assert.equal(this.element.textContent.trim(), '5');
  });

  test('the two given dates can be ISO strings', async function (assert) {
    this.setProperties({
      dateA: subDays(new Date(), 3).toISOString(),
      dateB: addDays(new Date(), 3).toISOString(),
    });

    await render(hbs`{{date-diff-in-days this.dateA this.dateB}}`);
    assert.equal(this.element.textContent.trim(), '6');
  });

  test('the two given dates can be in string format, if a format string arg is provided', async function (assert) {
    this.setProperties({
      dateA: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
      dateB: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    });

    await render(hbs`{{date-diff-in-days this.dateA this.dateB "yyyy-MM-dd"}}`);

    assert.equal(this.element.textContent.trim(), '7');
  });

  test('the two given dates can be MIXED format, if a format string is OMITTED', async function (assert) {
    // Hopefully no one in their right mind would want to do this
    this.setProperties({
      dateA: '2021-3-4',
      dateB: new Date(2021, 2, 2),
    });

    await render(hbs`{{date-diff-in-days this.dateA this.dateB}}`);

    assert.equal(this.element.textContent.trim(), '2');
  });

  test('renders nothing with no args', async function (assert) {
    await render(hbs`{{date-diff-in-days}}`);
    assert.equal(this.element.textContent, '');
  });
});
