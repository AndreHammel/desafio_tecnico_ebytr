/**
 * *** ATENÇÂO ***
 * Teste não implementado
 * em fase de construção
 */

// const sinon = require('sinon');
// const { expect } = require('chai');
// const statusCode = require('http-status-codes').StatusCodes;

// const taskService = require('../../services/taskService');
// const taskController = require('../../controllers/task/taskContoller');
// const {
//   BAD_REQUEST: { message },
// } = require('../../middlewares/errList');

// describe('6 - busca todos as tarefas dentro do banco de dados - Controller', () => {
//   describe('6.1 - resultado quando não existe nenhuma tarefa', () => {
// const request = {};
// const response = {};
// const next = {};
// before(() => {
//   request.body = {};
//   sinon.stub(taskService, 'createTaskService').resolves([]);
//   sinon.stub(taskController.createTaskController, 'next').resolves('abc');
// });
// after(() => taskService.createTaskService.restore());
// it('retorna resposta de status HTTP 401', async () => {
// await taskController.createTaskController(request, response, next);
// console.log(response);
// expect(response.status.calledWith(statusCode.BAD_REQUEST)).to.be.equal(true);
// });
// it('retorna um array em format de json', async () => {
// await taskController.createTaskController(request, response);
// expect(response.json.calledWith(message)).to.be.equal(true);
//   });
//   });
// });
