import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import * as adminService from '../../api/services/admin/UserService';

export const useAdmins = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.ADMINS.LIST, filters],
        queryFn: async () => {
            const response = await adminService.get(filters);
            return { data: response.data, meta: response.meta, link: response.link };
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
} 

export const useAdmin = (id, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.ADMINS.DETAIL, id],
        queryFn: async () => {
            const response = await adminService.getById(id);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
}

export const useAdminByName = (name, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.ADMINS.DETAIL, name],
        queryFn: async () => {
            const response = await adminService.getByName(name);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
}

export const useCreateUser = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => adminService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ADMINS.LIST],
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

export const useUpdateUser = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => adminService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.ADMINS.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ADMINS.LIST],
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

export const useDeleteUser = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => adminService.deleteUser(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ADMINS.LIST],
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

export const useRestoreUser = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => adminService.restoreUser(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ADMINS.LIST],
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


