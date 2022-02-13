require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');

const taskModel = require('../../models/taskModel');
const taskService = require('../../services/taskService');

const IdNotExists = '62069871ce27f818660e9646';
const IdExists = '62079f937b9594ae83bc96ec';

const taskMockWithIdExistsWithBody = {
  _id: '62079f937b9594ae83bc96ec',
  employee: 'Chapolim Colorado',
  task: 'Salvar alguém em algum lugar',
};

const taskMockIdInvalidNotHex = {
  _id: '62079f937b9594ae83bc9kkk',
};

const taskMockIdEmpty = {
  _id: '',
};

const returnWhenIdNotExists = {
  acknowledged: true,
  deletedCount: 0,
};

const returnWhenIdExists = {
  acknowledged: true,
  deletedCount: 1,
};

const invalidIdNotHex = '62079f937b9594ae83bc96ek';

describe('10 - faz a remoção de uma tarefa dentro do banco de dados - Service', () => {
  describe('10.1 - quando o id passado não é no formato aceito pelo ObjectId', () => {
    it('precisa retorna falso confirmando que id não é no formato ObjectId', async () => {
      const response = await taskService.removeTaskService(taskMockIdInvalidNotHex);
      expect(response).to.be.false;
    });
  });

  describe('10.2 - quando o id passado é vazio', () => {
    it('precisa retorna falso confirmando que id não é no formato ObjectId', async () => {
      const response = await taskService.removeTaskService(taskMockIdEmpty);
      expect(response).to.be.false;
    });
  });

  describe('10.3 - quando o id não existe no bando de dados', () => {
    before(() =>
      sinon.stub(taskModel, 'removeTaskModel').resolves(returnWhenIdNotExists),
    );
    after(() => taskModel.removeTaskModel.restore());

    it('precisa retorna um elemento do tipo objeto', async () => {
      const response = await taskService.removeTaskService(IdNotExists);
      expect(response).to.be.an('object');
    });
    it('o objeto retornado deve ter a chave "deletedCount"', async () => {
      const response = await taskService.removeTaskService(IdNotExists);
      expect(response).to.include.deep.keys('deletedCount');
    });
    it('o objeto retornado deve ter a chave "deletedCount" com valor igual a zero', async () => {
      const { deletedCount } = await taskService.removeTaskService(IdNotExists);
      expect(deletedCount).to.be.equal(0);
    });
  });

  describe('10.4 - quando o id existe no bando de dados', () => {
    before(() => sinon.stub(taskModel, 'removeTaskModel').resolves(returnWhenIdExists));
    after(() => taskModel.removeTaskModel.restore());

    it('precisa retorna um elemento do tipo objeto', async () => {
      const response = await taskService.removeTaskService(IdExists);
      expect(response).to.be.an('object');
    });
    it('o objeto retornado deve ter a chave "deletedCount"', async () => {
      const response = await taskService.removeTaskService(IdExists);
      expect(response).to.include.deep.keys('deletedCount');
    });
    it('o objeto retornado deve ter a chave "deletedCount" com valor igual a 1', async () => {
      const { deletedCount } = await taskService.removeTaskService(IdExists);
      expect(deletedCount).to.be.equal(1);
    });
    it('o objeto retornado deve ter a chave "deletedCount" com valor igual a 1', async () => {
      const { deletedCount } = await taskService.removeTaskService(IdExists);
      expect(deletedCount).to.be.equal(1);
    });
  });
});
