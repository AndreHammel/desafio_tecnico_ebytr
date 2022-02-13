require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');

const taskModel = require('../../models/taskModel');
const taskService = require('../../services/taskService');

const taskMockInvalid = {
  employee: 'Sr. Girafales',
  task: 'ta ta ta'.repeat(350),
  status: 'em andamento',
  date: '1988-07-15T09:00:00.000Z',
};
const taskMockValid = {
  employee: 'Kiko',
  task: 'Jogar futebol com o Chavez e ser o Luís Pereira',
  status: 'pronto',
  date: '1979-09-15T09:00:00.000Z',
};
const idMock = '62069871ce27f818660e9646';

describe('5 - Insere uma tarefa no banco de dados - Service', () => {
  describe('5.1 - quando número de caracteres no campo tarefa é maior que 300', async () => {
    it('deve retornar um boolean como false', async () => {
      const response = await taskService.createTaskService(taskMockInvalid);
      expect(response).to.be.a('boolean');
    });
  });
  describe('5.2 - quando a tarefa é válida e inserida com sucesso no banco de dados', async () => {
    before(() => {
      sinon.stub(taskModel, 'createTaskModel').resolves({ id: idMock });
    });
    after(() => {
      taskModel.createTaskModel.restore();
    });
    it('retorno deve ser um objeto', async () => {
      const response = await taskService.createTaskService(taskMockValid);
      expect(response).to.be.a('object');
    });
    it('o objeto retornado deve ser o id da tarefa inserida', async () => {
      const response = await taskService.createTaskService(taskMockValid);
      expect(response).to.have.a.property('id');
    });
  });
});
