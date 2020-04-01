import {combineReducers} from 'redux';
import products from './product';
import carts from './cart';
import auth from './auth';
export default combineReducers({
  products,
  carts,
  auth,
});
