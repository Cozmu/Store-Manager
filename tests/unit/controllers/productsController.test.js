const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateName = require('../../../src/middlewares/validateName');
const { productsController } = require('../../../src/controllers'); 
const { productsService } = require('../../../src/services');
const {
  allProducts,
  productById,
  newProduct,
  updateProduct
} = require('./mocks/products.controller.mocks');

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 5% das camadas da sua aplicação', function () {
  describe('CONTROLLER - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 5%', function () {
    it('Verifica se através do caminho /products, todos os produtos devem ser retornados', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAllProducts')
        .resolves({ type: null, message: allProducts });
      
      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
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
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ type: null, message: productById });

      await productsController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        "id": 1,
        "name": "Martelo de Thor"
      });
    });

    it('Verifica se não é possível listar um produto que não existe', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      await productsController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 10% das camadas da sua aplicação', function () {
  describe('CONTROLLER -  Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 10%', function () {
    it('Verifica se e possível adicionar um produto na tabela', async function () {
      const req = { body: { name: 'NewProduct' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'registerProduct')
        .resolves({ type: null, message: newProduct });
      
      await productsController.registerProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });

    it('Verifica se não e possível adicionar um produto na tabela com nome que tenha menos de 5 caracteres', async function () {
      const req = { body: { name: 'New' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'registerProduct')
        .resolves({ type: 'INVALID_NAME', message: '"name" length must be at least 5 characters long' });
      
      await productsController.registerProduct(req, res);
      
      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long'});
    });

    it('Verifica se não e possível adicionar um produto na tabela sem o campo "name" ', async function () {
      const req = { body: { name: '' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await validateName(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 25% das camadas da sua aplicação', function () {
  describe('CONTROLLER -  Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 25%', function () {
    it('Verifica se é possível atualizar um produto na rota /products/:id com o metodo "PUT"', async function () {
      const req = { body: { name: 'Produto Teste' }, params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateServiceProtuct')
        .resolves({ type: null, message: updateProduct })
      
      await productsController.updateControllerProtuct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ "id": "1", "name": "Produto Teste" });
    });

    it('Verifica se não é possível atualizar um produto sem a chave "name"', async function () {
      const req = { body: { }, params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateServiceProtuct')
        .resolves({ type: 'NAME_IS_REQUIRED', message: '"name" is required' })

      await productsController.updateControllerProtuct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Verifica se não é possível atualizar um produto com a chave "name" com menos de 5 caracteres', async function () {
      const req = { body: { name: 'Test' }, params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateServiceProtuct')
        .resolves({ type: 'INVALID_NAME', message: '"name" length must be at least 5 characters long' })

      await productsController.updateControllerProtuct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('Verifica se não é possível atualizar um produto inexistente na tabela', async function () {
      const req = { body: { name: 'Teste' }, params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateServiceProtuct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

      await productsController.updateControllerProtuct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});

describe('CONTROLLER - Desenvolva testes que cubram no mínimo 30% das camadas da sua aplicação', function () {
  describe('CONTROLLER - Validando se a cobertura total das linhas e funções dos arquivos de CADA camada models, services e controllers é maior ou igual a 30%', function () {
    it('Verifique se não é possível deletar um produto que não existe', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteServiceProduct')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })
      
      await productsController.deleteControllerProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Verifique se é possível deletar um produto com sucesso', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteServiceProduct')
        .resolves({ type: null , message: '' })

      await productsController.deleteControllerProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});