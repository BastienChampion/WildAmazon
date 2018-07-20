import * as express from 'express';

import ProductController from './controllers/ProductController';
import UserController from './controllers/UserController';
// import cat from './models/cat';
// import user from './models/user';

export default function routes(app) {

  const router = express.Router();

  const product = new ProductController();
  const user = new UserController();

  // products
  router.route('/products').get(product.getAll);
  router.route('/products/count').get(product.count);
  router.route('/product').post(product.insert);
  router.route('/product/:id').get(product.get);
  router.route('/product/:id').put(product.update);
  router.route('/product/:id').delete(product.delete);

  // users
  router.route('/login').post(user.login);
  router.route('/users').get(user.getAll);
  router.route('/users/count').get(user.count);
  router.route('/user').post(user.insert);
  router.route('/user/:id').get(user.get);
  router.route('/user/:id').put(user.update);
  router.route('/user/:id').delete(user.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
