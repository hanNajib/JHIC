import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as staffService from "../../api/services/admin/StaffService"

export const useStaff = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.STAFF.LIST, filters],
        queryFn: async () => {
            const response = await staffService.get(filters);
            return { data: response.data, meta: response.meta, link: response.links };
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
} 


export const useStaffById = (id, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.STAFF.DETAIL, id],
        queryFn: async () => {
            const response = await staffService.getById(id);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
        ...options
    })
}

export const useStaffStructure = (options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.STAFF.LIST, 'structure'],
        queryFn: async () => {
            const response = await staffService.getStructure();
            return response.data;
        },
        staleTime: 10 * 60 * 1000,
        ...options
    })
}

export const useCreateStaff = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => staffService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.STAFF.LIST],
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

export const useUpdateStaff = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => staffService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.STAFF.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.STAFF.LIST],
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

export const useDeleteStaff = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => staffService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.STAFF.LIST],
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

export const useRestoreStaff = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => staffService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.STAFF.LIST],
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

export const useForceDeleteStaff = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => staffService.forceDeleteData(id),
        onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAFF.LIST], exact: false }); if (options.onSuccess) options.onSuccess(); },
        onError: (error) => { if (options.onError) options.onError(error); }
    })
};

export const useBulkRestoreStaff = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids) => staffService.bulkRestoreData(ids),
        onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAFF.LIST], exact: false }); if (options.onSuccess) options.onSuccess(); },
        onError: (error) => { if (options.onError) options.onError(error); }
    })
};

export const useBulkForceDeleteStaff = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids) => staffService.bulkForceDeleteData(ids),
        onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.STAFF.LIST], exact: false }); if (options.onSuccess) options.onSuccess(); },
        onError: (error) => { if (options.onError) options.onError(error); }
    })
};