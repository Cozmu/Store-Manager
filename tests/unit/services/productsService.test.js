const { expect } = require('chai');
const sinon = require('sinon');
const { allProducts, productById, newProduct} = require('./mocks/products.service.mock');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');


describe('SERVICE - Desenvolva testes que cubram no mínimo 5% das camadas da sua aplicação', function () {
  describe('SERVICE - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 5%', function () {
    it('Verifica se através do caminho /products, todos os produtos devem ser retornados', async function () {
      sinon.stub(productsModel, 'findAllProducts').resolves(allProducts);
      const result = await productsService.getAllProducts();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal([
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ]);
    });

    it('Verifica se através do caminho /products/:id, apenas o produto com o id presente na URL deve ser retornado', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(productById);
      const result = await productsService.getProductById(1);
      
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal({
        "id": 1,
        "name": "Martelo de Thor"
      });
    });

    it('Verifica se não é possível listar um produto que não existe', async function () {
      const result = await productsService.getProductById(76);
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('Verifique se não é possível listar um produto com id invalido', async function () {
      const result = await productsService.getProductById('id');
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal( '"value" must be a number' );
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('SERVICE - Desenvolva testes que cubram no mínimo 10% das camadas da sua aplicação', function () {
  describe('SERVICE -  Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 10%', function () {
    it('Verifica se e possível adicionar um produto na tabela', async function () {
      sinon.stub(productsModel, 'insertProduct').resolves(4);
      const result = await productsService.registerProduct('newProduct');
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal({
        id: 4,
        name: "newProduct"
      });
    });

    it('Verifica se não e possível adicionar um produto na tabela com nome que tenha menos de 5 caracteres', async function () {
      const result = await productsService.registerProduct('new');
      expect(result.type).to.be.equal('INVALID_NAME');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('SERVICE - Desenvolva testes que cubram no mínimo 25% das camadas da sua aplicação', function () {
  describe('SERVICE -  Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 25%', function () {
    it('Verifica se é possível atualizar um produto na rota /products/:id com o metodo "PUT"', async function () {
      sinon.stub(productsModel, 'updateModelProtuct').resolves(1);
      const result = await productsService.updateServiceProtuct(1, 'Produto Teste');
      expect(result.type).to.be.equal(null); // erro nao stuba
      expect(result.message).to.be.deep.equal({ id: 1, name: 'Produto Teste' });
    });
    it('Verifica se não é possível atualizar um produto sem a chave "name"', async function () {
      const result = await productsService.updateServiceProtuct(1);
      expect(result.type).to.be.equal('NAME_IS_REQUIRED');
      expect(result.message).to.deep.equal('"name" is required');
    });
    it('Verifica se não é possível atualizar um produto com a chave "name" com menos de 5 caracteres', async function () {
      const result = await productsService.updateServiceProtuct(1, 'test');
      expect(result.type).to.be.equal('INVALID_NAME');
      expect(result.message).to.deep.equal('"name" length must be at least 5 characters long');
    });
    it('Verifica se não é possível atualizar um produto inexistente na tabela', async function () {
      const result = await productsService.updateServiceProtuct(999, 'Produto Teste');
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Product not found');
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('SERVICE - Desenvolva testes que cubram no mínimo 30% das camadas da sua aplicação', function () {
  describe('SERVICE - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 30%', function () {
    it('Verifique se é possível deletar um produto com sucesso', async function () {
      sinon.stub(productsModel, 'deleteModelProduct').resolves(1);
      const result = await productsService.deleteServiceProduct(1);
      expect(result.type).to.be.equal(null);
    });

    it('Verifique se não é possível deletar um produto que não existe', async function () { // Possivel erro
      const result = await productsService.deleteServiceProduct(999); 
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Product not found');
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});