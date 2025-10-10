import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import * as adminService from '../../api/services/admin/UserService';

export const useAdmins = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.ADMINS.LIST, filters],
        queryFn: async () => {
            const response = await adminService.get(filters);
            return response.data;
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

export const useCreateUser = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => adminService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.ADMINS.LIST]);
        },
        ...options
    })
}

export const useUpdateUser = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => adminService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.ADMINS.DETAIL, id]);
            queryClient.invalidateQueries([QUERY_KEYS.ADMINS.LIST]);
        },
        ...options
    })
}

export const useDeleteUser = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => adminService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.ADMINS.LIST]);
        },
        ...options
    })
}

export const useRestoreUser = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => adminService.restoreUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.ADMINS.LIST]);
        },
        ...options
    })
}


