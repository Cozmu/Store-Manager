const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models')
const connection = require('../../../src/models/connection');
const { allSales, saleById } = require('./mocks/sales.model.mock');

describe('MODEL - Desenvolva testes que cubram no mínimo 15% das camadas da sua aplicação', function () {
  describe('MODEL - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 15%', function () {
    it('Verifica se através do caminho /sales é possível adicionar uma venda a tabela sales', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      const result = await salesModel.insertSale();
      expect(result).to.be.equal(3);
    });

    it('Verifica se através do caminho /sales é possível adicionar uma venda a tabela sales_products', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 0 }]);
      const result = await salesModel.insertSaleProduct(3, 1, 3);
      expect(result.insertId).to.be.equal(0);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('MODEL - Desenvolva testes que cubram no mínimo 20% das camadas da sua aplicação', function () {
  describe('MODEL - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 20%', function () {
    it('Verifica se é possível listar todas as vendas na rota /sales com metodo "GET"', async function () { 
      sinon.stub(connection, 'execute').resolves([allSales]);
      const result = await salesModel.findAllSalesProducts();
      expect(result).to.be.deep.equal([
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
      sinon.stub(connection, 'execute').resolves([saleById]);
      const result = await salesModel.findSalesProductsById(1);
      expect(result).to.be.deep.equal([
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
      ])
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('MODEL - Desenvolva testes que cubram no mínimo 35% das camadas da sua aplicação', function () {
  describe('MODEL - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 35%', function () {
    it('Verifique se é possível deletar uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesModel.deleteModelSale(1);
      expect(result).to.be.equal(1);
    });

    it('Verifique se ao passar um id invalido e chamado a função de listagem de vendas', async function () {
      sinon.stub(connection, 'execute').resolves([{ id: 1, date: '2023-02-17T18:35:37.000Z' }]);
      const result = await salesModel.findSaleById(1);
      expect(result).to.be.deep.equal({ id: 1, date: '2023-02-17T18:35:37.000Z' });

    });

    afterEach(function () {
      sinon.restore();
    });
  });
});