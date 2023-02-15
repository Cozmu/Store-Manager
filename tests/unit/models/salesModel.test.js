const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models')
const connection = require('../../../src/models/connection');

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