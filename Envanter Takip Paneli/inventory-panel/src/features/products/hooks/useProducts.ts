import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import {
  getProducts,
  createProduct as apiCreateProduct,
} from "../services/productApi";
import { deleteProduct as apiDeleteProduct } from "../services/productApi";
import { updateProduct as apiUpdateProduct } from "../services/productApi";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Ürünler yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      await apiCreateProduct(product);
      await fetchProducts(); // 🔥 listeyi güncelle
    } catch (err) {
      setError("Ürün eklenemedi");
    }
  };

  const removeProduct = async (id: number) => {
    try {
      await apiDeleteProduct(id);
      await fetchProducts(); // listeyi güncelle
    } catch (err) {
      setError("Ürün silinemedi");
    }
  };

  const editProduct = async (id: number, data: any) => {
    try {
      await apiUpdateProduct(id, data);
      await fetchProducts();
    } catch (err) {
      setError("Ürün güncellenemedi");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    addProduct,
    removeProduct,
    editProduct,
  };
};
