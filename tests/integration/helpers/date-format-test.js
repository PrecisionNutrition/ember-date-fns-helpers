import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | date-format', function(hooks) {
  setupRenderingTest(hooks);

  test('can rely on default output format', async function(assert) {
    this.date = new Date('1995-12-17T00:00');

    await render(hbs`{{date-format this.date}}`);

    assert.equal(this.element.textContent.trim(), 'Dec 17, 1995');
  });

  test('can format date with output format as the second arg', async function(assert) {
    this.date = new Date('1995-12-17T00:00');

    await render(hbs`{{date-format this.date "yyyy-MM-dd"}}`);

    assert.equal(this.element.textContent.trim(), '1995-12-17');
  });

  test('can parse date ISO string', async function(assert) {
    await render(hbs`{{date-format "1995-12-17T00:00"}}`);

    assert.equal(this.element.textContent.trim(), 'Dec 17, 1995');
  });

  test('can parse date string with input format as the third arg', async function(assert) {
    await render(hbs`{{date-format "3/5/10" null "d/M/yy"}}`);
    assert.equal(this.element.textContent.trim(), 'May 3, 2010');

    await render(hbs`{{date-format "04/06/2011" null "dd/MM/yyyy"}}`);
    assert.equal(this.element.textContent.trim(), 'Jun 4, 2011');
  });

  test('reflects date change', async function(assert) {
    this.date = new Date('1995-12-17T00:00');
    await render(hbs`{{date-format this.date}}`);
    assert.equal(this.element.textContent.trim(), 'Dec 17, 1995');

    this.set('date', new Date('1983-01-20T00:00'));
    assert.equal(this.element.textContent.trim(), 'Jan 20, 1983');
  });

  test('renders nothing with no args', async function(assert) {
    await render(hbs`{{date-format}}`);
    assert.equal(this.element.textContent, '');
  });

  test('a timeZone option can be passed', async function(assert) {
    this.date = new Date('1995-12-17T12:45');
    this.timeZone = 'Antarctica/Troll'

    await render(hbs`{{date-format this.date "yyyy-MM-dd h:mm aaaa" timeZone=this.timeZone}}`);

    assert.equal(this.element.textContent, '1995-12-17 8:45 p.m.');
  });
});
