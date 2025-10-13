import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as categoryService from "../../api/services/admin/CategoryService";
export const useCategories = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES.LIST, filters],
    queryFn: async () => {
      const response = await categoryService.get(filters);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCategory = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES.DETAIL, id],
    queryFn: async () => {
      const response = await categoryService.getById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateCategory = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => categoryService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.CATEGORIES.LIST],
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
};

export const useUpdateCategory = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => categoryService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.CATEGORIES.LIST],
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
};

export const useDeleteCategory = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => categoryService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.CATEGORIES.LIST],
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
};

export const useRestoreCategory = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id) => categoryService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.CATEGORIES.LIST],
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
};
