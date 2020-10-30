import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | time', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders a time tag', async function(assert) {
    this.set('value', new Date(2020, 4, 13, 2, 30, 30));

    await render(hbs`<Time @value={{this.value}} class="some-class" />`);

    assert
      .dom('time')
      .exists()
      .hasAttribute('datetime', '2020-05-13T02:30:30.000')
      .hasText('May 13, 2020')
      .hasClass('some-class');
  });

  test('yields the inner html', async function(assert) {
    this.set('value', new Date(2020, 8, 28, 14, 0, 45));

    await render(hbs`
      <Time @value={{this.value}}>
        {{date-format this.value "MMM d"}}
      </Time>
    `);

    assert.dom('time').hasText('Sep 28');
  });
});
