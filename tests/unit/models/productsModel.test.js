const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts, newProduct  } = require('./mocks/products.model.mock');


describe('MODEL - Desenvolva testes que cubram no mínimo 5% das camadas da sua aplicação', function () {
  describe('MODEL - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 5%',  function () {
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

describe('MODEL - Desenvolva testes que cubram no mínimo 10% das camadas da sua aplicação', function () {
  describe('MODEL -  Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 10%', function () {
    it('Verifica se e possível adicionar um produto na tabela', async function () { 
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const result = await productsModel.insertProduct(newProduct.name);
      expect(result).to.be.equal(4);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('MODEL - Desenvolva testes que cubram no mínimo 25% das camadas da sua aplicação', function () {
  describe('MODEL - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 25%', function () {
    it('Verifica se é possível atualizar um produto na rota /products/:id com o metodo "PUT"', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.updateModelProtuct(1, 'Produto Teste');
      expect(result).to.be.equal(1);
    });
    
    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('MODEL - Desenvolva testes que cubram no mínimo 30% das camadas da sua aplicação', function () {
  describe('MODEL - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 30%', function () {
    it('Verifique se é possível deletar um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.deleteModelProduct(1);
      expect(result).to.be.equal(1);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});