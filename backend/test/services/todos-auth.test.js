const assert = require('assert');
const app = require('../../src/app');

describe('\'todosAuth\' service', () => {
  it('registered the service', () => {
    const service = app.service('todos-auth');

    assert.ok(service, 'Registered the service');
  });
});
