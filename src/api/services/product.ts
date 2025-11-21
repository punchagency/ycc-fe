import api from "../client";
import API_ENDPOINTS from "../../constants/api_endpoints";
import type { IProductInput, BulkProductInput } from "@/types/product.type";

export const ProductApi = {
  // Create a new product
  createProduct: (data: IProductInput) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description || '');
    if (data.productImages) {
      data.productImages.forEach((image, index) => {
        formData.append(`productImages[${index}]`, image);
      });
    }
    if (data.price !== undefined) formData.append('price', String(data.price));
    if (data.category) formData.append('category', data.category);
    if (data.sku) formData.append('sku', data.sku);
    if (data.quantity !== undefined) formData.append('quantity', String(data.quantity));
    if (data.minRestockLevel !== undefined) formData.append('minRestockLevel', String(data.minRestockLevel));
    if (data.wareHouseAddress) {
      Object.entries(data.wareHouseAddress).forEach(([key, value]) => {
        if (value) formData.append(`wareHouseAddress[${key}]`, value);
      });
    }
    if (data.hsCode) formData.append('hsCode', data.hsCode);
    if (data.weight !== undefined) formData.append('weight', String(data.weight));
    if (data.length !== undefined) formData.append('length', String(data.length));
    if (data.width !== undefined) formData.append('width', String(data.width));
    if (data.height !== undefined) formData.append('height', String(data.height));
    if (data.stripeProductId) formData.append('stripeProductId', data.stripeProductId);
    if (data.stripePriceId) formData.append('stripePriceId', data.stripePriceId);

    return api.post(API_ENDPOINTS.product.createProduct, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Update an existing product
  updateProduct: (id: string, data: IProductInput) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description || '');
    if (data.productImages) {
      data.productImages.forEach((image) => {
        formData.append('productImages', image);
      });
    }
    if (data.price !== undefined) formData.append('price', String(data.price));
    if (data.category) formData.append('category', data.category);
    if (data.sku) formData.append('sku', data.sku);
    if (data.quantity !== undefined) formData.append('quantity', String(data.quantity));
    if (data.minRestockLevel !== undefined) formData.append('minRestockLevel', String(data.minRestockLevel));
    if (data.wareHouseAddress) {
      Object.entries(data.wareHouseAddress).forEach(([key, value]) => {
        if (value) formData.append(`wareHouseAddress[${key}]`, value);
      });
    }
    if (data.hsCode) formData.append('hsCode', data.hsCode);
    if (data.weight !== undefined) formData.append('weight', String(data.weight));
    if (data.length !== undefined) formData.append('length', String(data.length));
    if (data.width !== undefined) formData.append('width', String(data.width));
    if (data.height !== undefined) formData.append('height', String(data.height));
    if (data.stripeProductId) formData.append('stripeProductId', data.stripeProductId);
    if (data.stripePriceId) formData.append('stripePriceId', data.stripePriceId);

    return api.put(API_ENDPOINTS.product.updateProduct.replace(':id', id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Delete a product
  deleteProduct: (id: string) =>
    api.delete(API_ENDPOINTS.product.deleteProduct.replace(':id', id)),

  // Fetch products by business
  getProductsByBusiness: (params: { page: number; limit: number }) =>
    api.get(API_ENDPOINTS.product.getProductsByBusiness, { params }),

  // Fetch a single product
  getProduct: (id: string) =>
    api.get(API_ENDPOINTS.product.getProduct.replace(':id', id)),

  // Bulk upload products
  uploadBulkProducts: (data: BulkProductInput) =>
    api.post(API_ENDPOINTS.product.uploadBulkProducts, data, {
      headers: { 'Content-Type': 'application/json' },
    }),
};
