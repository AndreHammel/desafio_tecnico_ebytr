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

describe('12 - POST /task/new-task', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });

  describe('12.1 - resultado quando o body não contem task ou status', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/task/new-task').send({
        employee: 'Bruxa do  71',
      });
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
    "Employee, task or status are not allowed to be empty"`, () => {
      expect(response.body.message).to.have.equals(
        'Employee, task or status are not allowed to be empty',
      );
    });
  });
  describe('12.2 - resultado quando o body não contem status', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/task/new-task').send({
        employee: 'Bruxa do  71',
        task: 'Em busca do gato Satanás',
      });
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
    "Employee, task or status are not allowed to be empty"`, () => {
      expect(response.body.message).to.have.equals(
        'Employee, task or status are not allowed to be empty',
      );
    });
  });
  describe('12.3 - resultado quando o body não contem task', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/task/new-task').send({
        employee: 'Bruxa do  71',
        status: 'em andamento',
      });
    });

    it('retornar código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retornar um objeto ', () => {
      expect(response.body).to.have.an('object');
    });

    it('retornar um json com chave igual a "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it(`retornar uma mensagem com a frase 
      "Employee, task or status are not allowed to be empty"`, () => {
      expect(response.body.message).to.have.equals(
        'Employee, task or status are not allowed to be empty',
      );
    });
  });
  describe('12.4 - retorno quando a adição de um nova tarefa foi bem sucedida', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/task/new-task').send({
        employee: 'Bruxa do  71',
        task: 'Procurar o gato Satanás',
        status: 'em andamento',
      });
    });
    it('retornar código de status 201', () => {
      expect(response).to.have.status(201);
    });
    it('retornar deve ser um objeto', () => {
      expect(response.body).to.have.an('object');
    });
    it('o objeto deve ter a chave id', () => {
      expect(response.body).to.have.property('id');
    });
  });
});
