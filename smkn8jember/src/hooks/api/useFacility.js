import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as facilityService from "../../api/services/admin/FacilityService";
export const useFacilities = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FACILITY.LIST, filters],
    queryFn: async () => {
      const response = await facilityService.get(filters);
      return { data: response.data, meta: response.meta, link: response.links };
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useFacility = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FACILITY.DETAIL, id],
    queryFn: async () => {
      const response = await facilityService.getById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateFacility = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => facilityService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.FACILITY.LIST],
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

export const useUpdateFacility = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => facilityService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.FACILITY.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.FACILITY.LIST],
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

export const useDeleteFacility = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => facilityService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.FACILITY.LIST],
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

export const useRestoreFacility = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id) => facilityService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.FACILITY.LIST],
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
