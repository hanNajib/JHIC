import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as majorService from "../../api/services/admin/MajorService"

export const useMajors = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.MAJORS.LIST, filters],
        queryFn: async () => {
            const response = await majorService.get(filters);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
} 

export const useMajor = (id, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.MAJORS.DETAIL, id],
        queryFn: async () => {
            const response = await majorService.getById(id);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
}

export const useCreateMajor = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => majorService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.MAJORS.LIST]);
        },
        ...options
    })
}

export const useUpdateMajor = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => majorService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.MAJORS.DETAIL, id]);
            queryClient.invalidateQueries([QUERY_KEYS.MAJORS.LIST]);
        },
        ...options
    })
}

export const useDeleteMajor = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => majorService.deleteData(id),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.MAJORS.LIST]);
        },
        ...options
    })
}

export const useRestoreMajor = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => majorService.restoreData(id),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.MAJORS.LIST]);
        },
        ...options
    })
}

