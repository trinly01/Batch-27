const todos = require('./todos/todos.service.js');
const users = require('./users/users.service.js');
const todosAuth = require('./todos-auth/todos-auth.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(todos);
  app.configure(users);
  app.configure(todosAuth);
};
