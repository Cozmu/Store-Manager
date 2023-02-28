const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const {
  invalidInput,
  invalidQuantity,
  newSale,
  productNotFound,
  requestNewSale,
  allSales,
  saleById,
  requestUpdateSale,
  updateSale
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
      const req = { body: requestNewSale };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: null, message: newSale });
        
      await salesController.registerSale(req, res);


      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 20% das camadas da sua aplicação', function () {
  describe('CONTROLLER - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 20%', function () {
    it('Verifica se é possível listar todas as vendas na rota /sales com metodo "GET"', async function () {
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

    it('Verifique se é possível listar uma venda específica com sucesso na rota /sales/:id com metodo "GET"', async function () {
      const req = { params: { id: 1 }};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getSalesProductsById')
        .resolves({ type: null, message: saleById });

      await salesController.listSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        {
          "date": "2023-02-16T20:41:50.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "date": "2023-02-16T20:41:50.000Z",
          "productId": 2,
          "quantity": 10
        }
      ]);
    });

    it('Verifique se não é possível listar uma venda que não existe', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getSalesProductsById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await salesController.listSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
}); 

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 35% das camadas da sua aplicação', function () {
  describe('CONTROLLER - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 35%', function () {
    it('Verifique se não é possível deletar uma venda que não existe', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'deleteServiceSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' })
      
      await salesController.deleteControllerSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });


    it('Verifique se é possível deletar uma venda com sucesso', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon
        .stub(salesService, 'deleteServiceSale')
        .resolves({ type: null, message: '' })

      await salesController.deleteControllerSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 40% das camadas da sua aplicação', function () {
  describe('CONTROLLER - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 40%', function () {

    it('Verifique se não é possível realizar uma atualização em uma venda com o campo quantity menor ou igual a 0 (Zero)', async function () {
      const req = { body: invalidQuantity, params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateServiceSale')
        .resolves({ type: 'INVALID_QUANTITY', message: '"quantity" must be greater than or equal to 1' });
      
      await salesController.updateControllerSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });

    it('Verifique se não é possível realizar uma atualização em uma venda sem os campos "productId" e "quantity"', async function () {
      const req = { body: invalidInput, params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateServiceSale')
        .resolves({ type: 'INVALID_INPUT', message: '"productId" is required' });
      
      await salesController.updateControllerSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });


    it('Verifique se não é possível realizar uma atualização em uma venda com o campo productId inexistente', async function () {
      const req = { body: productNotFound, params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateServiceSale')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      await salesController.updateControllerSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Verifique se não é possível realizare uma atualização em uma venda inexistente', async function () { 
      const req = { body: requestNewSale, params: 999 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateServiceSale')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      
      await salesController.updateControllerSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Verifica se  é possível alterar uma venda com sucesso', async function () {
      const req = { body: requestUpdateSale, params: 1 };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateServiceSale')
        .resolves({ type: null, message: updateSale });
      
      await salesController.updateControllerSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateSale);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});