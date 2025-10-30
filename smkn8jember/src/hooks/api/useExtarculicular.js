import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as extracurricularService from "../../api/services/admin/ExtarculicularService"
export const useExtarculiculars = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST, filters],
    queryFn: async () => {
      const response = await extracurricularService.get(filters);
      return { data: response.data, meta: response.meta, link: response.links };
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useExtarculicular = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EXTRACURICULARS.DETAIL, id],
    queryFn: async () => {
      const response = await extracurricularService.getById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateExtarculicular = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => extracurricularService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST],
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

export const useUpdateExtarculicular = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => extracurricularService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.EXTRACURICULARS.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST],
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

export const useDeleteExtarculicular = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => extracurricularService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST],
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

export const useRestoreExtarculicular = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id) => extracurricularService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST],
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

export const useForceDeleteExtarculicular = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id) => extracurricularService.forceDeleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST],
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

export const useBulkRestoreExtarculicular = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (ids) => extracurricularService.bulkRestoreData(ids),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST],
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

export const useBulkForceDeleteExtarculicular = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (ids) => extracurricularService.bulkForceDeleteData(ids),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST],
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
