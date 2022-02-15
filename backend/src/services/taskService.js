const taskModel = require('../models/taskModel');

const isValidTaskLength = require('../validations/isValidTaskLength');
const isIdValid = require('../validations/isIdValid');

module.exports = {
  getAllTasksService: async (objInfoTypeSort) =>
    taskModel.getAllTasksModel(objInfoTypeSort),
  createTaskService: async (taskObj) => {
    const { task } = taskObj;
    if (!isValidTaskLength(task)) return false;
    const result = await taskModel.createTaskModel({ ...taskObj, date: new Date() });
    return result;
  },
  updateTaskService: async (taskObj) => {
    const { _id } = taskObj;
    if (!isIdValid(_id)) return false;
    const result = await taskModel.updateTaskModel({ ...taskObj, date: new Date() });
    return result;
  },
  removeTaskService: async (id) => {
    if (!isIdValid(id)) return false;
    const result = await taskModel.removeTaskModel(id);
    return result;
  },
};
