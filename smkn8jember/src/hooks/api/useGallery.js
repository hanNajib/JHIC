import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as galleryService from "../../api/services/admin/GalleryService";
export const useGalleries = (filters = {}, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GALLERY.LIST, filters],
    queryFn: async () => {
      const response = await galleryService.get(filters);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useGallery = (id, options = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GALLERY.DETAIL, id],
    queryFn: async () => {
      const response = await galleryService.getById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateGallery = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => galleryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GALLERY.LIST]);
    },
    ...options,
  });
};

export const useUpdateGallery = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => galleryService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GALLERY.DETAIL, id]);
      queryClient.invalidateQueries([QUERY_KEYS.GALLERY.LIST]);
    },
    ...options,
  });
};

export const useDeleteGallery = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => galleryService.deleteData(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GALLERY.LIST]);
    },
    ...options,
  });
};

export const useRestoreGallery = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => galleryService.restoreData(id),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.GALLERY.LIST]);
    },
    ...options,
  });
};
