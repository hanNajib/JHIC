import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as subjectService from "../../api/services/admin/SubjectService"

export const useSubjects = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SUBJECTS.LIST, filters],
        queryFn: async () => {
            const response = await subjectService.get(filters);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
} 

export const useSubject = (id, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SUBJECTS.DETAIL, id],
        queryFn: async () => {
            const response = await subjectService.getById(id);
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        ...options
    })
}

export const useCreateSubject = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => subjectService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.SUBJECTS.LIST]);
        },
        ...options
    })
}

export const useUpdateSubject = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => subjectService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.SUBJECTS.DETAIL, id]);
            queryClient.invalidateQueries([QUERY_KEYS.SUBJECTS.LIST]);
        },
        ...options
    })
}

export const useDeleteSubject = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => subjectService.deleteData(id),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.SUBJECTS.LIST]);
        },
        ...options
    })
}

export const useRestoreSubject = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => subjectService.restoreData(id),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.SUBJECTS.LIST]);
        },
        ...options
    })
}

