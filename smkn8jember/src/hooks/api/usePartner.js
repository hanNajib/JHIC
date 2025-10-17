import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as partnerService from "../../api/services/admin/PartnerService"

export const usePartners = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PARTNERS.LIST, filters],
        queryFn: async () => {
            const response = await partnerService.get(filters);
            return {data: response.data, meta: response.meta, link: response.link};
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
} 

export const usePartner = (id, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PARTNERS.DETAIL, id],
        queryFn: async () => {
            const response = await partnerService.getById(id);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
}

export const useCreatePartner = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => partnerService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.PARTNERS.LIST],
                exact: false 
            });
            
            if (options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            if (options.onError) {
                options.onError(error, variables, context);
            }
        }
    })
}

export const useUpdatePartner = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => partnerService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.PARTNERS.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.PARTNERS.LIST],
                exact: false 
            });
            
            if (options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            if (options.onError) {
                options.onError(error, variables, context);
            }
        }
    })
}

export const useDeletePartner = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => partnerService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.MAJORS.LIST],
                exact: false 
            });
            
            if (options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            if (options.onError) {
                options.onError(error, variables, context);
            }
        }
    })
}

export const useRestorePartner = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => partnerService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.MAJORS.LIST],
                exact: false 
            });
            
            if (options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            if (options.onError) {
                options.onError(error, variables, context);
            }
        }
    })
}

