const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', body('title').notEmpty().withMessage('Title is required'), createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
