const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const {
  invalidInput,
  invalidQuantity,
  newSale,
  productNotFound,
  requestNewSale
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

    it('Verifique se é possível cadastrar uma venda com sucesso', async function () {
      const result = await salesService.registerSale(requestNewSale);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(newSale);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});