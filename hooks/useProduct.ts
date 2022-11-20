import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  fetchProducts,
  updateProduct,
} from "../services/product";

const useProduct = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: products } = useQuery(["products"], fetchProducts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: product } = useQuery(
    [`product ${id}`],
    () => fetchProduct(id as string),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    product,
    products,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
  };
};

export default useProduct;
