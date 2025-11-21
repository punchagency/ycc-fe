import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DocumentApi } from '@/api/services/document';
import type { IGetDocumentQuery } from '@/types/document.type';

export const useDocuments = (data: IGetDocumentQuery) => {
    return useQuery({
        queryKey: ['documents', data.category, data.page, data.limit],
        queryFn: () => DocumentApi.getDocuments(data),
    });
}

export const useUploadDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: DocumentApi.uploadDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents', 'document-count'] });
        },
    });
}

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: DocumentApi.deleteDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        },
    });
}

export const useDownloadURL = (id: string) => {
    return useQuery({
        queryKey: ['document-download', id],
        queryFn: () => DocumentApi.getDownloadURL(id),
        enabled: !!id,
    });
}

export const useDocumentCount = () => {
    return useQuery({
        queryKey: ['document-count'],
        queryFn: () => DocumentApi.getDocumentCount(),
    });
}
