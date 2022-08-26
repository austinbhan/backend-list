const { Router } = require('express');
const Task = require('../models/Task');

module.exports = Router()
  .get('/', async (req, res) => {
    const tasks = await Task.getAll();
    res.json(tasks);
  });
