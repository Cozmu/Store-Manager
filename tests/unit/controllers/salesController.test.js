const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const salesService = require('../../../src/services/sales.service');
const {
  invalidInput,
  invalidQuantity,
  newSale,
  productNotFound,
  requestNewSale,
  allSales
} = require('./mocks/sales.controller.mocks');

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 15% das camadas da sua aplicação', function () {
  describe('CONTROLLER - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 15%', function () {
    it('Verifique se não é possível realizar operações em uma venda sem os campos "productId" e "quantity"', async function () {
      const req = { body: invalidInput };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: 'INVALID_INPUT', message: '"productId" is required' });
      
      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Verifique se não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0 (Zero)', async function () {
      const req = { body: invalidQuantity };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: 'INVALID_QUANTITY', message: '"quantity" must be greater than or equal to 1' });
      
      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Verifique se não é possível realizar operações em uma venda com o campo productId inexistente', async function () {
      const req = { body: productNotFound };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Verifique se é possível cadastrar uma venda com sucesso', async function () {
      sinon.restore();
      const req = { body: requestNewSale };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: null, message: newSale });
        
      // console.log(newSale);
      await salesController.registerSale(req, res);


      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });

    afterEach(function () {
      // salesService.registerSale.restore();
      sinon.restore();
    });
  });
});

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 20% das camadas da sua aplicação', function () {
  describe('CONTROLLER - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 20%', function () {
    it('Verifica se é possível listar todas as vendas na tora /sales com metodo "GET"', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getAllSalesProducts')
        .resolves({ type: null, message: allSales });
      
      await salesController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        {
          "saleId": 1,
          "productId": 1,
          "date": "2023-02-16T18:32:28.000Z",
          "quantity": 5
        },
        {
          "saleId": 1,
          "productId": 2,
          "date": "2023-02-16T18:32:28.000Z",
          "quantity": 10
        },
        {
          "saleId": 2,
          "productId": 3,
          "date": "2023-02-16T18:32:28.000Z",
          "quantity": 15
        },
        {
          "saleId": 3,
          "productId": 1,
          "date": "2023-02-16T18:34:50.000Z",
          "quantity": 1
        },
        {
          "saleId": 3,
          "productId": 2,
          "date": "2023-02-16T18:34:50.000Z",
          "quantity": 5
        }
      ]);
    });
  });
}); 