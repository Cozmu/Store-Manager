const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts  } = require('./mocks/products.model.mock');


describe('MODEL - Desenvolva testes que cubram no mínimo 5% das camadas da sua aplicação', () => {
  describe('MODEL - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 5%', () => {
    it('Verifica se através do caminho /products, todos os produtos devem ser retornados', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const result = await productsModel.findAllProducts();
      expect(result).to.be.deep.equal(allProducts);
    }); 

    it('Verifica se através do caminho /products/:id, apenas o produto com o id presente na URL deve ser retornado', async function () {
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
      const result = await productsModel.findProductById(1);
      expect(result).to.be.deep.equal(allProducts[0]);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });
});