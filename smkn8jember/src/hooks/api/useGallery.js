import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as galleryService from "../../api/services/admin/GalleryService";

export const useGalleries = (filters = {}, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GALLERY.LIST, filters],
        queryFn: async () => {
            const response = await galleryService.get(filters);
            return { data: response.data, meta: response.meta, link: response.link };
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
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GALLERY.LIST],
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

export const useUpdateGallery = (id, options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => galleryService.update(id, data),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries([QUERY_KEYS.GALLERY.DETAIL, id]);
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GALLERY.LIST],
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

export const useDeleteGallery = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => galleryService.deleteData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GALLERY.LIST],
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

export const useRestoreGallery = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => galleryService.restoreData(id),
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GALLERY.LIST],
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
