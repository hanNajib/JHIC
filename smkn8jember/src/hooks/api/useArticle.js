import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as articleService from "../../api/services/admin/ArticleService";
export const useArticles = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE.LIST, filters],
    queryFn: async () => {
      const response = await articleService.get(filters);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useArticle = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE.DETAIL, id],
    queryFn: async () => {
      const response = await articleService.getById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateArticle = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => articleService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ARTICLE.LIST],
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

export const useUpdateArticle = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => articleService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.ARTICLE.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ARTICLE.LIST],
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

export const useDeleteArticle = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => articleService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ARTICLE.LIST],
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

export const useRestoreArticle = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id) => articleService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ARTICLE.LIST],
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
