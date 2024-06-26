import axios from 'axios';

import { API_URL } from '../config';

// Actions
const createActionName = (name) => `app/products/${name}`;

export const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');
export const ERROR = createActionName('ERROR');

export const loadProducts = (payload) => ({ type: LOAD_PRODUCTS, payload });
export const setError = (payload) => ({ type: ERROR, payload });

// Thunks
export const loadProductsRequest = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    dispatch(loadProducts(res.data));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

// Selectors
export const getProducts = ({ products }) => products.data;
export const getProductById = ({ products }, id) =>
  products && Array.isArray(products.data)
    ? products.data.find((product) => product.id === id)
    : null;
export const getProductsError = ({ products }) => products.error;

// Reducer
const productsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...statePart, data: action.payload };
    case ERROR:
      return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default productsReducer;
