import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ServiceApi } from '@/api/services/service';
import type { IServiceInput } from '@/types/service.type';
import APIErrorResponse from '@/utils/APIErrorResponse';

export const useServices = ({page = 1, limit = 10}:{page: number, limit: number}) => {
    const queryClient = useQueryClient();

    const servicesQuery = useQuery({
        queryKey: ['services', page, limit],
        queryFn: () => ServiceApi.getServicesByBusiness({ page, limit }),
    });

    const createServiceMutation = useMutation({
        mutationFn: ServiceApi.createService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });

    const updateServiceMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: IServiceInput }) =>
            ServiceApi.updateService(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });

    const deleteServiceMutation = useMutation({
        mutationFn: ServiceApi.deleteService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] });
        },
    });

    return {
        services: servicesQuery,
        createService: createServiceMutation,
        updateService: updateServiceMutation,
        deleteService: deleteServiceMutation,
    };
}

export const useService = (id: string) => {
    return useQuery({
        queryKey: ['service', id],
        queryFn: () => ServiceApi.getService(id),
        enabled: !!id,
    });
}

export const useUploadBulkServices = () => {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ServiceApi.uploadBulkServices,
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['services'] });
        // },
        onError: (error) => {
            APIErrorResponse(error);
        }
    });
}