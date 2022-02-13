require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const taskModel = require('../../models/taskModel');
const { getConnection } = require('../connectionMock');

const { DATABASE, COLLECTION } = process.env;
const taskMock = {
  employee: 'Sr. Barriga',
  task: 'Cobrar aluguel do Sr. Madruga',
  status: 'pendente',
  date: '1986-06-01T08:00:00.000Z',
};

describe('4 - Insere um nova tarefa no banco de dados', () => {
  let connectionMock;
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
    MongoClient.connect.restore();
  });
  describe('4.1 - quando a tarefa é inserida com sucesso', () => {
    it('deve retorna um objeto', async () => {
      const response = await taskModel.createTaskModel(taskMock);
      expect(response).to.be.a('object');
    });
    it('objeto retornado deve ter o id da nova tarefa', async () => {
      const response = await taskModel.createTaskModel(taskMock);
      expect(response).to.have.a.property('id');
    });
  });
});
