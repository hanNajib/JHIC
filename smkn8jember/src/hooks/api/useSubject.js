import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as subjectService from "../../api/services/admin/SubjectService"

export const useSubjects = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SUBJECTS.LIST, filters],
        queryFn: async () => {
            const response = await subjectService.get(filters);
            return { data: response.data, meta: response.meta, link: response.links };
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
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.SUBJECTS.LIST],
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

export const useUpdateSubject = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => subjectService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.SUBJECTS.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.SUBJECTS.LIST],
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

export const useDeleteSubject = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => subjectService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.SUBJECTS.LIST],
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

export const useRestoreSubject = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => subjectService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.SUBJECTS.LIST],
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

