import productModel from '../models/productModel';
import BaseController from './BaseController';

export default class ProductController extends BaseController {
  model = productModel;
}
