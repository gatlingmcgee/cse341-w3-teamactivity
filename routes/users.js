const express = require('express');
const routes = express.Router();

const usersController = require('../controllers/users');

routes.get('/', usersController.getAll);
routes.get('/:id', usersController.getSingle);
routes.post('/', usersController.createUser);
routes.put('/:id', usersController.updateUser);
routes.delete('/:id', usersController.deleteUser);

module.exports = routes;