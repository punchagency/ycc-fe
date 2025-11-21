import api from "../client";
import API_ENDPOINTS from "../../constants/api_endpoints";
import type { BulkServiceInput, IServiceInput } from "@/types/service.type";



export const ServiceApi = {
    createService: (data: IServiceInput) => {
        const formData = new FormData();
        formData.append('name', data?.name || '');
        if (data.description) formData.append('description', data.description);
        if (data?.serviceImage) {
            data.serviceImage.forEach((imageURL, index) => {
                formData.append(`serviceImage[${index}]`, imageURL);
            });
        }
        formData.append('price', String(data?.price || 0));
        formData.append('categoryId', data?.categoryId || '');
        formData.append('isQuotable', String(data?.isQuotable || false));
        return api.post(API_ENDPOINTS.service.createService, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    updateService: (id: string, data: IServiceInput) => {
        const formData = new FormData();
        if (data?.name) formData.append('name', data?.name);
        if (data?.description) formData.append('description', data.description);
        if (data?.serviceImage) {
            data.serviceImage.forEach((imageURL) => {
                formData.append(`serviceImage`, imageURL);
            });
        }
        formData.append('price', String(data?.price || 0));
        formData.append('categoryId', data?.categoryId || '');
        formData.append('isQuotable', String(data?.isQuotable || false));
        return api.put(API_ENDPOINTS.service.updateService.replace(':id', id), formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    deleteService: (id: string) =>
        api.delete(API_ENDPOINTS.service.deleteService.replace(':id', id)),
    getServicesByBusiness: (data: { page: number, limit: number}) =>
        api.get(API_ENDPOINTS.service.getServicesByBusiness, { params: data }),
    getService: (id: string) =>
        api.get(API_ENDPOINTS.service.getService.replace(':id', id)),
    uploadBulkServices: (data: BulkServiceInput) =>
        api.post(API_ENDPOINTS.service.uploadBulkServices, data, {
            headers: { 'Content-Type': 'application/json' }
        })
};
