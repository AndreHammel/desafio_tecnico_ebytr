require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');

const taskModel = require('../../models/taskModel');
const taskService = require('../../services/taskService');

const taskMockWithIdNotExists = {
  _id: '62069871ce27f818660e9646',
  employee: 'Chapolim Colorado',
  task: 'Salvar alguém em algum lugar',
  status: 'pendente',
  date: '1988-07-15T09:00:00.000Z',
};

const taskMockWithIdExistsWithoutBody = {
  _id: '62079f937b9594ae83bc96ec',
};

const taskMockWithIdExistsWithBody = {
  _id: '62079f937b9594ae83bc96ec',
  employee: 'Chapolim Colorado',
  task: 'Salvar alguém em algum lugar',
};

const taskMockIdInvalidNotHex = {
  _id: '62079f937b9594ae83bc9kkk',
  employee: 'Chapolim Colorado',
  task: 'Siga me os bons!',
  status: 'em andamento',
};

const taskMockIdEmpty = {
  _id: '',
  employee: 'Chapolim Colorado',
  task: 'Siga me os bons!',
  status: 'em andamento',
};

const returnWhenIdNotExists = {
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 0,
};

const returnWhenIdExistsWithoutBody = {
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1,
};

const returnWhenIdExists = {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1,
};

const invalidIdNotHex = '62079f937b9594ae83bc96ek';

describe('9 - faz a atualização de uma tarefa dentro do banco de dados - Service', () => {
  describe('9.1 - quando o id passado não é no formato aceito pelo ObjectId', () => {
    it('precisa retorna falso confirmando que id não é no formato ObjectId', async () => {
      const response = await taskService.updateTaskService(taskMockIdInvalidNotHex);
      expect(response).to.be.false;
    });
  });

  describe('9.2 - quando o id passado é vazio', () => {
    it('precisa retorna falso confirmando que id não é no formato ObjectId', async () => {
      const response = await taskService.updateTaskService(taskMockIdEmpty);
      expect(response).to.be.false;
    });
  });

  describe('9.3 - quando o id não existe no bando de dados', () => {
    before(() =>
      sinon.stub(taskModel, 'updateTaskModel').resolves(returnWhenIdNotExists),
    );
    after(() => taskModel.updateTaskModel.restore());

    it('precisa retorna um elemento do tipo objeto', async () => {
      const response = await taskService.updateTaskService(taskMockWithIdNotExists);
      expect(response).to.be.an('object');
    });
    it('o objeto retornado deve ter a chave "matchedCount"', async () => {
      const response = await taskService.updateTaskService(taskMockWithIdNotExists);
      expect(response).to.include.deep.keys('matchedCount');
    });
    it('o objeto retornado deve ter a chave "matchedCount" com valor igual a zero', async () => {
      const { matchedCount } = await taskService.updateTaskService(
        taskMockWithIdNotExists,
      );
      expect(matchedCount).to.be.equal(0);
    });
  });

  describe('9.4 - quando o id existe no bando de dados porem o body não contém nenhum informação', () => {
    before(() =>
      sinon.stub(taskModel, 'updateTaskModel').resolves(returnWhenIdExistsWithoutBody),
    );
    after(() => taskModel.updateTaskModel.restore());

    it('precisa retorna um elemento do tipo objeto', async () => {
      const response = await taskService.updateTaskService(
        taskMockWithIdExistsWithoutBody,
      );
      expect(response).to.be.an('object');
    });
    it('o objeto retornado deve ter a chave "matchedCount"', async () => {
      const response = await taskService.updateTaskService(
        taskMockWithIdExistsWithoutBody,
      );
      expect(response).to.include.deep.keys('matchedCount');
    });
    it('o objeto retornado deve ter a chave "matchedCount" com valor igual a 1', async () => {
      const { matchedCount } = await taskService.updateTaskService(
        taskMockWithIdExistsWithoutBody,
      );
      expect(matchedCount).to.be.equal(1);
    });
    it('o objeto retornado deve ter a chave "modifiedCount" com valor igual a 0', async () => {
      const { modifiedCount } = await taskService.updateTaskService(
        taskMockWithIdExistsWithoutBody,
      );
      expect(modifiedCount).to.be.equal(0);
    });
  });

  describe(`9.5 - quando o id existe no bando de dados e há um body que 
            contém informação a ser atualizada`, () => {
    before(() => sinon.stub(taskModel, 'updateTaskModel').resolves(returnWhenIdExists));
    after(() => taskModel.updateTaskModel.restore());

    it('precisa retorna um elemento do tipo objeto', async () => {
      const response = await taskService.updateTaskService(taskMockWithIdExistsWithBody);
      expect(response).to.be.an('object');
    });
    it('o objeto retornado deve ter a chave "matchedCount"', async () => {
      const response = await taskService.updateTaskService(taskMockWithIdExistsWithBody);
      expect(response).to.include.deep.keys('matchedCount');
    });
    it('o objeto retornado deve ter a chave "matchedCount" com valor igual a 1', async () => {
      const { matchedCount } = await taskService.updateTaskService(
        taskMockWithIdExistsWithBody,
      );
      expect(matchedCount).to.be.equal(1);
    });
    it('o objeto retornado deve ter a chave "modifiedCount" com valor igual a 1', async () => {
      const { modifiedCount } = await taskService.updateTaskService(
        taskMockWithIdExistsWithBody,
      );
      expect(modifiedCount).to.be.equal(1);
    });
  });
});
