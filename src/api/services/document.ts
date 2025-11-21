import api from "../client";
import API_ENDPOINTS from "../../constants/api_endpoints";
import type { IDocumentInput, IGetDocumentQuery } from "@/types/document.type";

export const DocumentApi = {
    uploadDocument: (data: IDocumentInput) => {
        const formData = new FormData();
        formData.append('category', data.category);
        formData.append('document', data.document);
        return api.post(API_ENDPOINTS.document.uploadDocument, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    getDocuments: (data: IGetDocumentQuery) => {
        return api.get(API_ENDPOINTS.document.getDocumentsByCategory.replace(':category', data.category), { params: data });
    },
    deleteDocument: (id: string) => api.delete(API_ENDPOINTS.document.deleteDocument.replace(':id', id)),
    getDownloadURL: (id: string) => api.get(API_ENDPOINTS.document.getDownloadURL.replace(':id', id)),
    getDocumentCount: () => api.get(API_ENDPOINTS.document.getDocumentCount)
};