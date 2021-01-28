import { addDays } from 'date-fns';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | is-future', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    await render(hbs`
      {{if (is-future this.date) "yes" "no"}}
    `);

    assert.dom().hasText('no');

    this.date = new Date();

    assert.dom().hasText('no');

    this.set('date', addDays(this.date, 1));

    assert.dom().hasText('yes');
  });
});
