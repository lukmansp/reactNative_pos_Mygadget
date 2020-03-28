import axios from 'axios';
export const addCart = data => {
  return {
    type: 'ADD_CART_DATA',
    payload: data,
  };
};

export const deleteCart = data => {
  return {
    type: 'DELETE_CART_DATA',
    payload: data,
  };
};

export const addQty = id => {
  return {
    type: 'ADD_QTY',
    payload: id,
  };
};
export const reduceQty = id => {
  return {
    type: 'REDUCE_QTY',
    payload: id,
  };
};
export const postOrder = data => {
  return {
    type: 'POST_ORDER',
    payload: axios({
      method: 'POST',
      url: 'http://192.168.1.16:9009/order',
      data: data,
    }),
  };
};
