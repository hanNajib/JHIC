import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as extracurricularService from "../../api/services/admin/ExtarculicularService"
export const useExtarculiculars = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EXTRACURICULARS.LIST, filters],
    queryFn: async () => {
      const response = await extracurricularService.get(filters);
      return response.data;
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
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.EXTRACURICULARS.LIST]);
    },
    ...options,
  });
};

export const useUpdateExtarculicular = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => extracurricularService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.EXTRACURICULARS.DETAIL, id]);
      queryClient.invalidateQueries([QUERY_KEYS.EXTRACURICULARS.LIST]);
    },
    ...options,
  });
};

export const useDeleteExtarculicular = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => extracurricularService.deleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.EXTRACURICULARS.LIST]);
    },
    ...options,
  });
};

export const useRestoreExtarculicular = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => extracurricularService.restoreData(id),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.EXTRACURICULARS.LIST]);
        },
        ...options
    })
};
