import axios from "axios";
import IProduct, { ICreateProduct, IProductRequest } from "../types/IProduct";

export const fetchProducts = async (): Promise<IProduct[]> => {
  return axios
    .get("/api/products")
    .then((response) => response.data);
};

export const fetchProduct = async (id: string): Promise<IProduct> => {
  return axios
    .get(`/api/products/${id}`)
    .then((response) => response.data);
};

export const createProduct = async (data: ICreateProduct) => {
  return axios
    .post(`http://localhost:3000/api/products`, { data })
    .then((response) => response.data);
};

export const updateProduct = async (data: IProductRequest) => {
  return axios
    .put(`http://localhost:3000/api/products`, data)
    .then((response) => response.data);
};

export const deleteProduct = async (id: string) => {
  return axios
    .delete(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.data);
};
