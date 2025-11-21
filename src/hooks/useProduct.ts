import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductApi } from '@/api/services/product';
import type { IProductInput } from '@/types/product.type';
import APIErrorResponse from '@/utils/APIErrorResponse';

/**
 * Hook for fetching paginated products + CRUD mutations
 */
export const useProducts = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => ProductApi.getProductsByBusiness({ page, limit }),
  });

  const createProductMutation = useMutation({
    mutationFn: (data: IProductInput) => ProductApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IProductInput }) =>
      ProductApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => ProductApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: productsQuery,
    createProduct: createProductMutation,
    updateProduct: updateProductMutation,
    deleteProduct: deleteProductMutation,
  };
};

/**
 * Hook for fetching a single product by ID
 */
export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi.getProduct(id!),
    enabled: !!id,
  });
};

/**
 * Hook for bulk uploading products (e.g., CSV/Excel)
 */
export const useUploadBulkProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ProductApi.uploadBulkProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      APIErrorResponse(error);
    },
  });
};