import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as webSettingsService from "../../api/services/admin/WebSettingsService"

export const useWebSettings = (options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.WEB_SETTINGS],
        queryFn: async () => {
            const response = await webSettingsService.getSettings();
            return { data: response.data, meta: response.meta, link: response.links };
        },
        ...options
    });
};

export const useWebSettingByTitle = (title, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.WEB_SETTINGS, title],
        queryFn: async () => {
            const response = await webSettingsService.getByTitle(title);
            return { data: response.data, meta: response.meta, link: response.links };
        },
        ...options
    });
};

export const useUpdateWebSettings = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ title, data }) => webSettingsService.updateSettings(title, data),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEYS.WEB_SETTINGS]);
        },
        ...options
    });
};
