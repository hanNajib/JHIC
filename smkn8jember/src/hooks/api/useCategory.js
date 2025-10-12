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
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES.LIST]);
    },
    ...options,
  });
};

export const useUpdateCategory = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => categoryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES.DETAIL, id]);
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES.LIST]);
    },
    ...options,
  });
};

export const useDeleteCategory = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => categoryService.deleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES.LIST]);
    },
    ...options,
  });
};

export const useRestoreCategory = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => categoryService.restoreData(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES.LIST]);
    },
    ...options,
  });
};
