import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

let sandbox, config;

moduleFor('metrics-adapter:facebook-pixel', 'facebook-pixel adapter', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
    config = {
      id: '123456'
    };
  },
  afterEach() {
    sandbox.restore();
  }
});

test('trackEvent calls fbq correctly', function(assert) {
  const adapter = this.subject({ config });
  const stub = sandbox.stub(window, 'fbq', () => {});

  adapter.trackEvent({
    event: 'testEvent'
  });

  assert.ok(stub.calledWith('track', 'testEvent'), 'fbq is called correctly');
});

test('trackEvent calls fbq with the correct options', function(assert) {
  const adapter = this.subject({ config });
  const stub = sandbox.stub(window, 'fbq', () => {});

  adapter.trackEvent({
    event: 'testEvent',
    testOption: 'test'
  });

  assert.ok(
      stub.calledWith('track', 'testEvent', {testOption: 'test'}),
      'fbq is called with the correct options'
  );
});

test('trackCustom calls fbq correctly', function(assert) {
  const adapter = this.subject({ config });
  const stub = sandbox.stub(window, 'fbq', () => {});

  adapter.trackCustom({
    event: 'testCustomEvent'
  });

  assert.ok(stub.calledWith('trackCustom', 'testCustomEvent'), 'fbq is called correctly');
});

test('trackCustom calls fbq with the correct options', function(assert) {
  const adapter = this.subject({ config });
  const stub = sandbox.stub(window, 'fbq', () => {});

  adapter.trackCustom({
    event: 'testCustomEvent',
    testOption: 'test'
  });

  assert.ok(
      stub.calledWith('trackCustom', 'testCustomEvent', {testOption: 'test'}),
      'fbq is called with the correct options'
  );
});

test('#trackPage calls fbq correctly', function(assert) {
  const adapter = this.subject({ config });
  const stub = sandbox.stub(window, 'fbq', () => {});

  adapter.trackPage();

  assert.ok(stub.calledWith('track', 'PageView'), 'fbq is called correctly');
});

test('#trackPage calls fbq with the correct options', function(assert) {
  const adapter = this.subject({ config });
  const stub = sandbox.stub(window, 'fbq', () => {});

  adapter.trackPage({title: 'test'});

  assert.ok(
      stub.calledWith('track', 'PageView', {title: 'test'}),
      'fbq is called with the correct options'
  );
});
