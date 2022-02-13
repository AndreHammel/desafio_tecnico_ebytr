const express = require('express');

const taskController = require('./taskContoller');

const router = express.Router({ mergeParams: true });

router.get('/', taskController.getAllTasksController);
router.post('/new-task', taskController.createTaskController);
router.put('/update-task', taskController.updateTaskController);
router.delete('/remove-task', taskController.removeTaskController);

module.exports = router;
