require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');

const taskModel = require('../../models/taskModel');
const taskService = require('../../services/taskService');

const taskMock = {
  _id: '62069871ce27f818660e9646',
  employee: 'Chapolim Colorado',
  task: 'Salvar alguém em algum lugar',
  status: 'pendente',
  date: '1988-07-15T09:00:00.000Z',
};

describe('2 - busca todos as tarefas dentro do banco de dados - Service', () => {
  describe('2.1 - resultado quando não existe nenhuma tarefa', () => {
    before(() => sinon.stub(taskModel, 'getAllTasksModel').resolves([]));
    after(() => taskModel.getAllTasksModel.restore());

    it('precisa retorna um array', async () => {
      const response = await taskService.getAllTasksService();
      expect(response).to.be.an('array');
    });

    it('o array precisa estar vazio', async () => {
      const response = await taskService.getAllTasksService();
      expect(response).to.be.empty;
    });
  });

  describe('2.2 - quando há pelo menos uma tarefa já cadastrada', () => {
    before(() => sinon.stub(taskModel, 'getAllTasksModel').resolves([taskMock]));
    after(() => taskModel.getAllTasksModel.restore());

    it('precisa retorna um array', async () => {
      const response = await taskService.getAllTasksService();
      expect(response).to.be.an('array');
    });

    it('o array precisa NÂO estar vazio', async () => {
      const response = await taskService.getAllTasksService();
      expect(response).to.be.not.empty;
    });

    it('o array precisa ser do tipo objeto', async () => {
      const [item] = await taskService.getAllTasksService();
      expect(item).to.be.an('object');
    });

    it('o objeto retornado precisa ter as chaves: _id, employee, task, status, date', async () => {
      const [item] = await taskService.getAllTasksService();
      expect(item).to.include.all.keys('_id', 'employee', 'task', 'status', 'date');
    });
  });
});
