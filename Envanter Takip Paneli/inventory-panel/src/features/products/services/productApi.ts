import axios from "axios";
import type { Product } from "../types/product";

const API_URL = "http://localhost:3001/products";

export const getProducts = async (): Promise<Product[]> => {
  console.log("🌐 API URL:", API_URL);

  const res = await axios.get(API_URL);

  console.log("📦 RAW RESPONSE:", res);

  return res.data;
};

export const createProduct = async (product: Omit<Product, "id">) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

export const updateProduct = async (id: number, product: any) => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};
