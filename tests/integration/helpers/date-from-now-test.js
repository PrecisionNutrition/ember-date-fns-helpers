import { addDays, subDays, format } from 'date-fns';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | date-from-now', function(hooks) {
  setupRenderingTest(hooks);

  test('shows suffix by default', async function(assert) {
    this.set('date', subDays(new Date(), 3));
    await render(hbs`{{date-from-now this.date}}`);
    assert.equal(this.element.textContent.trim(), '3 days ago');

    this.set('date', addDays(new Date(), 3));
    await render(hbs`{{date-from-now this.date}}`);
    assert.equal(this.element.textContent.trim(), 'in 3 days');
  });

  test('can hide suffix', async function(assert) {
    this.set('date', subDays(new Date(), 3));
    await render(hbs`{{date-from-now this.date addSuffix=false}}`);
    assert.equal(this.element.textContent.trim(), '3 days');

    this.set('date', addDays(new Date(), 3));
    await render(hbs`{{date-from-now this.date addSuffix=false}}`);
    assert.equal(this.element.textContent.trim(), '3 days');
  });

  test('can parse date ISO string', async function(assert) {
    this.set('date', subDays(new Date(), 3).toISOString());
    await render(hbs`{{date-from-now this.date}}`);
    assert.equal(this.element.textContent.trim(), '3 days ago');
  });

  test('can parse date string with input format as the second arg', async function(assert) {
    this.set('date', format(subDays(new Date(), 3), 'dd/MM/yyyy Hms'));
    await render(hbs`{{date-from-now this.date "dd/MM/yyyy Hms"}}`);
    assert.equal(this.element.textContent.trim(), '3 days ago');
  });

  test('renders nothing with no args', async function(assert) {
    await render(hbs`{{date-from-now}}`);
    assert.equal(this.element.textContent, '');
  });
});
