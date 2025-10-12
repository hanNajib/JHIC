import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as announcementService from "../../api/services/admin/AnnouncementService";
export const useAnnouncements = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ANNOUNCEMENT.LIST, filters],
    queryFn: async () => {
      const response = await announcementService.get(filters);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useAnnouncement = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ANNOUNCEMENT.DETAIL, id],
    queryFn: async () => {
      const response = await announcementService.getById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateAnnouncement = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => announcementService.create(data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ANNOUNCEMENT.LIST],
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

export const useUpdateAnnouncement = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => announcementService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.ANNOUNCEMENT.DETAIL, id]);
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ANNOUNCEMENT.LIST],
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

export const useDeleteAnnouncement = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => announcementService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ANNOUNCEMENT.LIST],
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

export const useRestoreAnnouncement = (options = {}) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id) => announcementService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({ 
                queryKey: [QUERY_KEYS.ANNOUNCEMENT.LIST],
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
