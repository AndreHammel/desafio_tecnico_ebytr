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

describe('13 - PUT /task/update-task', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });

  describe('13.1 - resultado enviado um id não no formato ObjectId', () => {
    let response;
    beforeEach(async () => {
      const task = connectionMock.db(DATABASE).collection(COLLECTION);
      await task.insertOne(taskMock);

      response = await chai
        .request(server)
        .put('/task/update-task')
        .send({ _id: '1234' });
    });

    afterEach(async () => {
      await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
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

    it(`retornar uma mensagem com a frase 
    "Must be a valid id"`, () => {
      expect(response.body.message).to.have.equals('Must be a valid id');
    });
  });
  describe(`13.2 - quando envia um id do tipo ObjectId mas não há um 
    correspondente deste id no banco de dados`, () => {
    let response;
    beforeEach(async () => {
      const task = connectionMock.db(DATABASE).collection(COLLECTION);
      await task.insertOne(taskMock);

      response = await chai
        .request(server)
        .put('/task/update-task')
        .send({ _id: '62079f937b9594ae83bc96e9', status: 'pendente' });
    });

    afterEach(async () => {
      await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
    });

    it('retornar código de status 202', () => {
      expect(response).to.have.status(202);
    });

    it('retornar um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('o objeto retornado deve ter a chave "matchedCount"', () => {
      expect(response.body).to.include.deep.keys('matchedCount');
    });
    it('o objeto retornado deve ter a chave "matchedCount" com valor igual a zero', () => {
      const { matchedCount } = response.body;
      expect(matchedCount).to.be.equal(0);
    });
  });
  describe(`13.3 - quando envia um id do tipo ObjectId e há um 
  correspondente deste id no banco de dados`, () => {
    let response;
    beforeEach(async () => {
      const task = connectionMock.db(DATABASE).collection(COLLECTION);
      const { insertedId } = await task.insertOne(taskMock);

      response = await chai
        .request(server)
        .put('/task/update-task')
        .send({ _id: insertedId, status: 'pendente' });
    });

    afterEach(async () => {
      await connectionMock.db(DATABASE).collection(COLLECTION).deleteMany({});
    });

    it('retornar código de status 202', () => {
      expect(response).to.have.status(202);
    });

    it('retornar um objeto', () => {
      expect(response.body).to.have.an('object');
    });

    it('o objeto retornado deve ter a chave "matchedCount"', () => {
      expect(response.body).to.include.deep.keys('matchedCount');
    });

    it('o objeto retornado deve ter a chave "matchedCount" com valor igual a 1', () => {
      const { matchedCount } = response.body;
      expect(matchedCount).to.be.equal(1);
    });

    it('o objeto retornado deve ter a chave "modifiedCount"', () => {
      expect(response.body).to.include.deep.keys('modifiedCount');
    });

    it('o objeto retornado deve ter a chave "modifiedCount" com valor igual a 1', () => {
      const { modifiedCount } = response.body;
      expect(modifiedCount).to.be.equal(1);
    });
  });
});
