const initialState = {
  products: [],
  product: null,
  isLoading: false,
};

export default products = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_PRODUCTS_FULFILLED':
      return {
        ...state,
        products: action.payload.data.result,
        isLoading: false,
      };
    case 'POST_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'POST_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: true,
      };

    case 'POST_PRODUCTS_FULFILLED':
      const newDataProduct = [...state.products, action.payload.data.result];
      return {
        ...state,
        products: newDataProduct,
        isLoading: false,
      };

    case 'UPDATE_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true,
      };

    case 'UPDATE_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: true,
      };

    case 'UPDATE_PRODUCT_FULFILLED':
      const newProductAfterUpdate = state.products.map(product => {
        if (product.id === action.payload.data.result.id) {
          return action.payload.data.data;
        }

        return product;
      });
      return {
        ...state,
        isLoading: false,
        products: newProductAfterUpdate,
      };
    case 'DELETE_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true,
      };

    case 'DELETE_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: true,
      };

    case 'DELETE_PRODUCT_FULFILLED':
      const newProductAfterDelete = state.products.filter(
        product => product.id !== action.payload.product.id,
      );
      return {
        ...state,
        isLoading: false,
        products: newProductAfterDelete,
      };
    default:
      return state;
  }
};
