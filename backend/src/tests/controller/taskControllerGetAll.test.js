const sinon = require('sinon');
const { expect } = require('chai');
const statusCode = require('http-status-codes').StatusCodes;

const taskService = require('../../services/taskService');
const taskController = require('../../controllers/task/taskContoller');

describe('3 - busca todos as tarefas dentro do banco de dados - Controller', () => {
  describe('3.1 - resultado quando não existe nenhuma tarefa', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'getAllTasksService').resolves([]);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });
    after(() => taskService.getAllTasksService.restore());

    it('retorna resposta de status HTTP 200', async () => {
      await taskController.getAllTasksController(request, response);
      expect(response.status.calledWith(statusCode.OK)).to.be.equal(true);
    });

    it('retorna um array em format de json', async () => {
      await taskController.getAllTasksController(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
