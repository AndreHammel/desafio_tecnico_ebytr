require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const taskModel = require('../../models/taskModel');
const { getConnection } = require('../connectionMock');

const { DATABASE, COLLECTION } = process.env;

const taskMock = {
  employee: 'Chapolim Colorado',
  task: 'Salvar alguém em algum lugar',
  status: 'pendente',
  date: '1988-07-15T09:00:00.000Z',
};

const wrongId = '62079f937b9594ae83bc96e8';

describe('8 - Remoção de uma tarefa pelo id no bando de dados - Model', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });
  //{ acknowledged: true, deletedCount: 0 }

  describe('8.1 - quando o id não conter no banco de dados', () => {
    it('o retorno deve ser um objeto', async () => {
      const response = await taskModel.removeTaskModel(wrongId);
      expect(response).to.be.an('object');
    });
    it('o retorno deve um objeto NÂO vazio', async () => {
      const response = await taskModel.removeTaskModel(wrongId);
      expect(response).to.be.not.empty;
    });
    it('o objeto deve ter a chave "deletedCount"', async () => {
      const response = await taskModel.removeTaskModel(wrongId);
      expect(response).to.include.deep.keys('deletedCount');
    });
    it(`o objeto deve ter a chave "deletedCount" com valor igual a 0 
        confirmando assim que nenhuma tarefa no banco de dados foi removida`, async () => {
      const { deletedCount } = await taskModel.removeTaskModel(wrongId);
      expect(deletedCount).to.equal(0);
    });
  });

  describe('8.2 - xxx', () => {
    let info;
    beforeEach(async () => {
      info = await connectionMock.db(DATABASE).collection(COLLECTION).insertOne(taskMock);
    });
    afterEach(async () => {
      await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
    });
    it('precisa retorna um objeto', async () => {
      const { insertedId } = info;
      const response = await taskModel.removeTaskModel(insertedId);
      expect(response).to.be.an('object');
    });
    it('o retorno deve um objeto NÂO vazio', async () => {
      const { insertedId } = info;
      const response = await taskModel.removeTaskModel(insertedId);
      expect(response).to.be.not.empty;
    });
    it('o objeto deve ter a chave "deletedCount"', async () => {
      const { insertedId } = info;
      const response = await taskModel.removeTaskModel(insertedId);
      expect(response).to.include.deep.keys('deletedCount');
    });
    it(`o objeto deve ter a chave "deletedCount" com valor igual a 1 
        confirmando assim a remoção da tarefa`, async () => {
      const { insertedId } = info;
      const { deletedCount } = await taskModel.removeTaskModel(insertedId);
      expect(deletedCount).to.equal(1);
    });
  });
});
