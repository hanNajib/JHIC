import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as facilityService from "../../api/services/admin/FacilityService";
export const useFacilities = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FACILITY.LIST, filters],
    queryFn: async () => {
      const response = await facilityService.get(filters);
      return response.data;
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
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.FACILITY.LIST]);
    },
    ...options,
  });
};

export const useUpdateFacility = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => facilityService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.FACILITY.DETAIL, id]);
      queryClient.invalidateQueries([QUERY_KEYS.FACILITY.LIST]);
    },
    ...options,
  });
};

export const useDeleteFacility = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => facilityService.deleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.FACILITY.LIST]);
    },
    ...options,
  });
};

export const useRestoreFacility = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => facilityService.restoreData(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.FACILITY.LIST]);
    },
    ...options,
  });
};
