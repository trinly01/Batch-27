// Initializes the `todosAuth` service on path `/todos-auth`
const { TodosAuth } = require('./todos-auth.class');
const createModel = require('../../models/todos-auth.model');
const hooks = require('./todos-auth.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/todos-auth', new TodosAuth(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('todos-auth');

  service.publish(() => {
    return app.channel('authenticated')
  })

  service.hooks(hooks);
};
