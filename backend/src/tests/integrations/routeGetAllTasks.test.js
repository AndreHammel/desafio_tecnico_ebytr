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
  employee: 'Sr. Girafales',
  task: 'ta ta ta',
  status: 'em andamento',
  date: '1988-07-15T09:00:00.000Z',
};

describe('11 - GET /task', function () {
  let connectionMock;

  before(async function () {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async function () {
    await MongoClient.connect.restore();
  });

  describe('11.1 - retorno com sucesso quando não há tarefa no banco de dados', function () {
    let response;
    before(async function () {
      const tasks = connectionMock.db(DATABASE).collection(COLLECTION);
      response = await chai
        .request(server)
        .get('/task')
        .set({ column: 'data', value: 1 });
    });

    it('retorna código de status 200', function () {
      expect(response).to.have.status(200);
    });

    it('resposta é um array', function () {
      expect(response.body).to.be.an('array');
    });
  });

  describe('11.2 - retorno com sucesso quando há tarefa no banco de dados', function () {
    let response;

    beforeEach(async function () {
      const task = connectionMock.db(DATABASE).collection(COLLECTION);
      await task.insertOne(taskMock);

      response = await chai
        .request(server)
        .get('/task')
        .set({ column: 'data', value: 1 });
    });

    afterEach(async function () {
      await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
    });

    it('retorna código de status 200', function () {
      expect(response).to.have.status(200);
    });

    it('resposta é um array', function () {
      expect(response.body).to.be.an('array');
    });

    it('resposta é um array de objeto', function () {
      expect(response.body[0]).to.be.an('object');
    });

    it('o objeto de resposta tem as chaves: _id, task, employee, date', function () {
      expect(response.body[0]).to.include.deep.keys('_id', 'task', 'employee', 'date');
    });

    it('os valores das chaves do objeto deve corresponder com o valor do taskMock', function () {
      expect(response.body[0].employee).to.be.equal('Sr. Girafales');
      expect(response.body[0].task).to.be.equal('ta ta ta');
      expect(response.body[0].status).to.be.equal('em andamento');
      expect(response.body[0].date).to.be.equal('1988-07-15T09:00:00.000Z');
    });
  });
});
