import api from "../client";
import API_ENDPOINTS from "../../constants/api_endpoints";
import type { CategoryInput } from "../../types/category.type";

const CategoryApi = {
    createCategory: (data: CategoryInput) => {
        const formData = new FormData();
        formData.append('name', data?.name || '');
        if (data.description) formData.append('description', data.description);
        if (data.type) formData.append('type', data.type);
        if (data.image) formData.append('image', data.image);
        formData.append('isApproved', String(data?.isApproved || false));
        return api.post(API_ENDPOINTS.category.createCategory, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    updateCategory: (id: string, data: CategoryInput) => {
        const formData = new FormData();
        if (data?.name) formData.append('name', data?.name);
        if (data?.description) formData.append('description', data.description);
        if (data?.type) formData.append('type', data.type);
        if (data?.image) formData.append('image', data.image);
        formData.append('isApproved', String(data?.isApproved || false));
        return api.put(API_ENDPOINTS.category.updateCategory.replace(':id', id), formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    deleteCategory: (id: string) =>
        api.delete(API_ENDPOINTS.category.deleteCategory.replace(':id', id)),
    getCategories: (data: {type?: 'service' | 'product' | null, isApproved?: boolean}) => {
        const params = Object.fromEntries(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );
        return api.get(API_ENDPOINTS.category.getCategories, { params });
    },
    getCategory: (id: string) =>
        api.get(API_ENDPOINTS.category.getCategory.replace(':id', id)),
};

export default CategoryApi;