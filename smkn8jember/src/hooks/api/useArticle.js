import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as articleService from "../../api/services/admin/ArticleService";
export const useArticles = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE.LIST, filters],
    queryFn: async () => {
      const response = await articleService.get(filters);
      return { data: response.data, meta: response.meta, link: response.links };
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useArticlesPublic = (filters = {}, options = {}) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ARTICLE.LIST, filters],
    queryFn: async ({ pageParam = null }) => {
      const params = { ...filters };
      if (pageParam) params.cursor = pageParam;
      const response = await articleService.get(params);
      return { data: response.data, meta: response.meta, link: response.links };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.next_cursor || undefined;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useArticle = (slug, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ARTICLE.DETAIL, slug],
    queryFn: async () => {
      const response = await articleService.getBySlug(slug);
      return response;
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

export const useUpdateArticleStatus = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }) => articleService.updateStatus(id, { status }),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.ARTICLE.DETAIL, variables.id]);
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
}
