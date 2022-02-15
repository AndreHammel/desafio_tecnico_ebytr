const statusCode = require('http-status-codes').StatusCodes;

const taskService = require('../../services/taskService');
const {
  BAD_REQUEST_EMPLOYEE_TASK,
  BAD_REQUEST_ID,
} = require('../../middlewares/errList');

const getAllTasksController = async (req, res, _next) => {
  try {
    const { column, value } = req.headers;
    const resultGetAllTasksController = await taskService.getAllTasksService({
      column,
      value,
    });
    return res.status(statusCode.OK).json(resultGetAllTasksController);
  } catch (error) {
    console.log(error);
  }
};

const createTaskController = async (req, res, next) => {
  try {
    const { employee, task, status } = req.body;
    if (!employee || !task || !status) return next(BAD_REQUEST_EMPLOYEE_TASK);
    const resultCreateTaskController = await taskService.createTaskService(req.body);
    return res.status(statusCode.CREATED).json(resultCreateTaskController);
  } catch (error) {
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const resultUpdateTaskController = await taskService.updateTaskService(req.body);
    if (!resultUpdateTaskController) return next(BAD_REQUEST_ID);
    return res.status(statusCode.ACCEPTED).json(resultUpdateTaskController);
  } catch (error) {
    next(error);
  }
};

const removeTaskController = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const resultRemoveTaskController = await taskService.removeTaskService(_id);
    if (!resultRemoveTaskController || !_id) return next(BAD_REQUEST_ID);
    return res.status(statusCode.OK).json(resultRemoveTaskController);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasksController,
  createTaskController,
  updateTaskController,
  removeTaskController,
};
