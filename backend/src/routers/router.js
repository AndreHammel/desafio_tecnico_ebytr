const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/task', require('../controllers/task/taskRoutes'));

module.exports = root;
