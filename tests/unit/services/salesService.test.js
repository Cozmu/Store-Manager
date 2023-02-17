const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {
  invalidInput,
  invalidQuantity,
  newSale,
  productNotFound,
  requestNewSale,
  allSales, 
  saleById
} = require('./mocks/sales.service.mock');


describe('SERVICE - Desenvolva testes que cubram no mínimo 15% das camadas da sua aplicação', function () {
  describe('SERVICE - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 15%', function () {
    it('Verifique se não é possível realizar operações em uma venda sem os campos "productId" e "quantity"', async function () {
      const result = await salesService.registerSale(invalidInput);

      expect(result.type).to.be.equal('INVALID_INPUT');
      expect(result.message).to.be.equal('"productId" is required');
    });

    it('Verifique se não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0 (Zero)', async function () {
      const result = await salesService.registerSale(invalidQuantity);

      expect(result.type).to.be.equal('INVALID_QUANTITY');
      expect(result.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    it('Verifique se não é possível realizar operações em uma venda com o campo productId inexistente', async function () {
      const result = await salesService.registerSale(productNotFound);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.equal('Product not found');
    });

    it('Verifique se é possível cadastrar uma venda com sucesso', async function () { // erro aqui talvez
      sinon.stub(salesModel, 'insertSale').resolves(3);
      sinon.stub(salesModel, 'insertSaleProduct').resolves();
      const result = await salesService.registerSale(requestNewSale);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(newSale);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('SERVICE - Desenvolva testes que cubram no mínimo 20% das camadas da sua aplicação', function () {
  describe('SERVICE - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 20%', function () {
    it('Verifica se é possível listar todas as vendas na rota /sales com metodo "GET"', async function () { 
      sinon.stub(salesModel, 'findAllSalesProducts').resolves(allSales);
      const result = await salesService.getAllSalesProducts();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal([
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
      sinon.stub(salesModel, 'findSalesProductsById').resolves(saleById);
      const result = await salesService.getSalesProductsById(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal([
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
      const result = await salesService.getSalesProductsById(999);
      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.be.equal('Sale not found');
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});