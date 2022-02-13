require('dotenv').config();
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');

const server = require('../../../index');
const { getConnection } = require('../connectionMock');

const { expect } = chai;
const { DATABASE, COLLECTION } = process.env;

chai.use(chaiHttp);

const taskMock = {
  employee: 'Bruxa do 71',
  task: 'Verificar se é o Satanás (vulgo gato)',
  status: 'em andamento',
  date: '1989-04-13T09:00:00.000Z',
};

describe('14 - DELETE /task/remove-task', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('14.1 - resultado quando o id não é passado', () => {
    let response;
    before(async () => {
      response = await chai.request(server).delete('/task/remove-task').send({});
    });

    it('retornar código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retornar um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('retornar um json com chave igual a "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('retornar uma mensagem com a frase "Must be a valid id"', () => {
      expect(response.body.message).to.have.equals('Must be a valid id');
    });
  });
  describe('14.2 - quando o id passado não é do formato ObjectId', () => {
    let response;
    before(async () => {
      response = await chai
        .request(server)
        .delete('/task/remove-task')
        .send({ _id: '1234' });
    });

    it('retornar código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retornar um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('retornar um json com chave igual a "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('retornar uma mensagem com a frase "Must be a valid id"', () => {
      expect(response.body.message).to.have.equals('Must be a valid id');
    });
  });
  describe('14.3 - quando o id passado está correto mas não existe no bando de dados', () => {
    let response;
    before(async () => {
      response = await chai
        .request(server)
        .delete('/task/remove-task')
        .send({ _id: '62079f937b9594ae83bc96e9' });
    });

    it('retornar código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retornar um objeto ', () => {
      expect(response.body).to.have.an('object');
    });

    it('o objeto deve ter a chave "deletedCount"', async () => {
      expect(response.body).to.include.deep.keys('deletedCount');
    });

    it('o objeto deve ter a chave "deletedCount" com valor igual a 0', async () => {
      const { deletedCount } = response.body;
      expect(deletedCount).to.equal(0);
    });
  });
  describe('14.4 - retorno quando a remoção de um nova tarefa foi bem sucedida', () => {
    let response;
    beforeEach(async () => {
      const task = connectionMock.db(DATABASE).collection(COLLECTION);
      const { insertedId } = await task.insertOne(taskMock);

      response = await chai
        .request(server)
        .delete('/task/remove-task')
        .send({ _id: insertedId, status: 'pendente' });
    });

    it('retornar código de status 201', () => {
      expect(response).to.have.status(200);
    });

    it('retornar deve ser um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('o objeto deve ter a chave "deletedCount"', async () => {
      expect(response.body).to.include.deep.keys('deletedCount');
    });

    it('o objeto deve ter a chave "deletedCount" com valor igual a 1', async () => {
      const { deletedCount } = response.body;
      expect(deletedCount).to.equal(1);
    });
  });
});
