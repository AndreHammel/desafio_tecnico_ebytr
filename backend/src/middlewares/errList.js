const statusCode = require('http-status-codes').StatusCodes;

const BAD_REQUEST_EMPLOYEE_TASK = {
  code: statusCode.BAD_REQUEST,
  message: 'Employee, task or status are not allowed to be empty',
};

const BAD_REQUEST_ID = {
  code: statusCode.BAD_REQUEST,
  message: 'Must be a valid id',
};

module.exports = {
  BAD_REQUEST_EMPLOYEE_TASK,
  BAD_REQUEST_ID,
};
