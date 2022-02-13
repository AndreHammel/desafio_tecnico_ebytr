require('dotenv').config();
const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const taskModel = require('../../models/taskModel');
const { getConnection } = require('../connectionMock');

const { DATABASE, COLLECTION } = process.env;
const taskMock = {
  employee: 'Sr. Madruga',
  task: 'Não pagar o aluguel',
  status: 'em andamento',
  date: '1986-06-01T08:00:00.000Z',
};

describe('1 - busca todos as tarefas dentro do banco de dados - Model', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('1.1 - resultado quando não existe nenhuma tarefa', () => {
    it('precisa retorna um array', async () => {
      const response = await taskModel.getAllTasksModel();
      expect(response).to.be.an('array');
    });

    it('o array precisa estar vazio', async () => {
      const response = await taskModel.getAllTasksModel();
      expect(response).to.be.empty;
    });
  });

  describe('1.2 - quando há pelo menos uma tarefa já cadastrada', () => {
    before(async () => {
      await connectionMock.db(DATABASE).collection(COLLECTION).insertOne(taskMock);
    });

    after(async () => {
      await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
    });

    it('precisa retorna um array', async () => {
      const response = await taskModel.getAllTasksModel();
      expect(response).to.be.an('array');
    });

    it('o array precisa NÃO estar vazio', async () => {
      const response = await taskModel.getAllTasksModel();
      expect(response).to.be.not.empty;
    });

    it('o array precise ser do tipo objeto', async () => {
      const [item] = await taskModel.getAllTasksModel();
      expect(item).to.be.an('object');
    });

    it('o objeto de retorno precisa conter as chaves: _id, employee, task, status e date ', async () => {
      const [item] = await taskModel.getAllTasksModel();
      expect(item).to.include.all.keys('_id', 'employee', 'task', 'status', 'date');
    });
  });
});
