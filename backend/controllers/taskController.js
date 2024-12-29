const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error'); // Importando el módulo HttpError

// Obtener todas las tareas
const getTasks = async (req, res, next) => {
  try {
    const { completed } = req.query;
    const filter = completed ? { completed: completed === 'true' } : {};
    const tasks = await Task.find(filter);

    if (!tasks || tasks.length === 0) {
      return next(new HttpError('No se encontraron tareas.', 404)); // Usando HttpError para manejo de errores
    }

    res.status(200).json({ tasks });
  } catch (error) {
    return next(new HttpError('Algo salió mal, no se pudieron obtener las tareas.', 500)); // Usando HttpError para manejo de errores
  }
};

// Obtener una tarea por ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new HttpError('Tarea no encontrada.', 404)); // Usando HttpError para manejo de errores
    }
    res.status(200).json({ task });
  } catch (error) {
    return next(new HttpError('Algo salió mal, no se pudo obtener la tarea.', 500)); // Usando HttpError para manejo de errores
  }
};

// Crear una nueva tarea
const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Datos inválidos, por favor revisa tu información.', 422)); // Usando HttpError para manejo de errores
  }

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    return next(new HttpError('No se pudo crear la tarea, por favor intenta nuevamente.', 500)); // Usando HttpError para manejo de errores
  }
};

// Actualizar una tarea
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return next(new HttpError('Tarea no encontrada.', 404)); // Usando HttpError para manejo de errores
    }
    res.status(200).json({ task });
  } catch (error) {
    return next(new HttpError('Algo salió mal, no se pudo actualizar la tarea.', 500)); // Usando HttpError para manejo de errores
  }
};

// Eliminar una tarea
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return next(new HttpError('Tarea no encontrada.', 404)); // Usando HttpError para manejo de errores
    }
    res.status(200).json({ message: 'Tarea eliminada.' });
  } catch (error) {
    return next(new HttpError('Algo salió mal, no se pudo eliminar la tarea.', 500)); // Usando HttpError para manejo de errores
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
