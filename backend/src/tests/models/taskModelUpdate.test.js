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

const wrongId = '62079f937b9594ae83bc96ex';

describe('7 - faz a atualização de uma tarefa dentro do banco de dados - Model', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('7.1 - quando é passado um id hexadecimal que não está no banco de dados', () => {
    it('o retorno deve ser um objeto', async () => {
      const response = await taskModel.updateTaskModel(wrongId);
      expect(response).to.be.an('object');
    });
    it('o retorno deve ser um objeto NÂO vazio', async () => {
      const response = await taskModel.updateTaskModel(wrongId);
      expect(response).to.be.not.empty;
    });
    it('o objeto deve ter a chave "modifiedCount"', async () => {
      const response = await taskModel.updateTaskModel(wrongId);
      expect(response).to.include.deep.keys('modifiedCount');
    });
    it(`o objeto deve ter a chave "modifiedCount" com valor igual a 0 mostrando 
        que não foi feita nenhuma modificação no banco de dados`, async () => {
      const { modifiedCount } = await taskModel.updateTaskModel(wrongId);
      expect(modifiedCount).to.equal(0);
    });
  });

  describe('7.2 - quando é passado um id hexadecimal que está no banco de dados', () => {
    let taskModified;
    beforeEach(async () => {
      const { insertedId } = await connectionMock
        .db(DATABASE)
        .collection(COLLECTION)
        .insertOne(taskMock);
      taskModified = {
        _id: insertedId,
        task: 'Combater a bruxa Baratuxa',
      };
    });
    afterEach(async () => {
      await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
    });
    it('precisa retorna um objeto', async () => {
      const response = await taskModel.updateTaskModel(taskModified);
      expect(response).to.be.an('object');
    });
    it('o retorno deve um objeto NÂO vazio', async () => {
      const response = await taskModel.updateTaskModel(taskModified);
      expect(response).to.be.not.empty;
    });
    it('o objeto deve ter a chave "modifiedCount"', async () => {
      const response = await taskModel.updateTaskModel(taskModified);
      expect(response).to.include.deep.keys('modifiedCount');
    });
    it('o objeto deve ter a chave "modifiedCount" com valor igual a 1 confirmando assim a atualização', async () => {
      const { modifiedCount } = await taskModel.updateTaskModel(taskModified);
      expect(modifiedCount).to.equal(1);
    });
  });
});
