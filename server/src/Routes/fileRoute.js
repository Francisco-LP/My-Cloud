const express = require('express');
const fileControllers = require('../Controllers/fileControllers');
const route = express.Router();

route.get('/files', fileControllers.get);
route.post('/upload', fileControllers.uploadArchivo);

module.exports = route;

