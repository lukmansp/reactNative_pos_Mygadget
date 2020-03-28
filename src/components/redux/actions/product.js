import axios from 'axios';
export const getProducts = () => {
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'get',
      url: 'http://192.168.1.16:9009/product',
    }),
  };
};
export const searchProducts = (search, category, page) => {
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'get',
      url: `http://192.168.1.16:9009/product?name=${search}&category=${category}`,
    }),
  };
};
export const pageProducts = page => {
  return {
    type: 'GET_PRODUCTS',
    payload: axios({
      method: 'get',
      url: `http://192.168.1.16:9009/product?pages=${page}`,
    }),
  };
};

export const postProduct = data => {
  return {
    type: 'POST_PRODUCT',
    payload: axios({
      method: 'POST',
      url: 'http://192.168.1.16:9009/product',
      data: data,
    }),
  };
};
export const updateProduct = (productId, data) => {
  return {
    type: 'UPDATE_PRODUCT',
    payload: axios({
      method: 'PATCH',
      url: `http://192.168.1.16:9009/product/${productId}`,
      data: data,
    }),
  };
};
export const deleteProduct = productId => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      method: 'DELETE',
      url: `http://192.168.1.16:9009/product/${productId}`,
    }),
  };
};
