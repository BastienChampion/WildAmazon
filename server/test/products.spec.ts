import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import productModel from '../models/productModel';

const should = chai.use(chaiHttp).should();

describe('products', () => {

  beforeEach((done) => {
    productModel.remove({}, (err) => {
      done();
    });
  });

  describe('Backend tests for products', () => {

    it('should get all the products', (done) => {
      chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get products count', (done) => {
      chai.request(app)
        .get('/api/products/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new product', (done) => {
      const newProduct = new productModel({ name: 'Fluffy', weight: 4, age: 2 });
      chai.request(app)
        .post('/api/product')
        .send(newProduct)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a product by its id', (done) => {
      const newProduct = new productModel({ name: 'product', weight: 2, age: 4 });
      newProduct.save((error, newproduct) => {
        chai.request(app)
          .get(`/api/product/${newproduct.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newproduct.id);
            done();
          });
      });
    });

    it('should update a product by its id', (done) => {
      const newProduct = new productModel({ name: 'product', weight: 2, age: 4 });
      newProduct.save((error, newproduct) => {
        chai.request(app)
          .put(`/api/product/${newproduct.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a product by its id', (done) => {
      const newProduct = new productModel({ name: 'product', weight: 2, age: 4 });
      newProduct.save((error, newproduct) => {
        chai.request(app)
          .delete(`/api/product/${newproduct.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


