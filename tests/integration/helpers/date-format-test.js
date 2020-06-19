import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { utcToZonedTime } from 'date-fns-tz';

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

  test('a timezone arg can be used to format a date in one tz into another tz', async function(assert) {
    this.today = new Date('1995-12-17T00:00:00Z');
    this.targetTimeZone = null;

    await render(hbs`{{date-format this.today "yyyy-MM-dd h:mm aaaa" timeZone=this.targetTimeZone}}`);
    assert.equal(this.element.textContent, '1995-12-16 4:00 p.m.');

    this.set('targetTimeZone', 'Antarctica/Troll');
    assert.equal(this.element.textContent, '1995-12-17 12:00 a.m.');

    this.set('targetTimeZone', 'America/Los_Angeles');
    assert.equal(this.element.textContent, '1995-12-16 4:00 p.m.');

    this.set('targetTimeZone', 'America/Toronto');
    assert.equal(this.element.textContent, '1995-12-16 7:00 p.m.');

    this.set('targetTimeZone', 'Australia/Sydney');
    assert.equal(this.element.textContent, '1995-12-17 11:00 a.m.');
  });
});
