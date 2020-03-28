import {combineReducers} from 'redux';
import products from './product';
import carts from './cart';
export default combineReducers({
  products,
  carts,
});
