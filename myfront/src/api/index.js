// Database
import axios from 'axios';
export const API = axios.create({
    baseURL: 'http://localhost:5000',
  });

export const createProduct = (id) => API.post("/product", id);

export const getProduct = () => API.get(`/product`);
export const updateProduct = ( product) =>
  API.patch(`/product/update`, {  product: product });
export const deleteProduct = ( product) =>
  API.post(`/product/delete`, { product: product });
