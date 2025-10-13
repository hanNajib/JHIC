import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import * as webSettingsService from "../../api/services/admin/WebSettingsService"

export const useWebSettings = (options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.WEB_SETTINGS],
        queryFn: webSettingsService.getSettings,
        ...options
    });
};

export const useWebSettingByTitle = (title, options = {}) => {
    return useQuery({
        queryKey: [QUERY_KEYS.WEB_SETTINGS, title],
        queryFn: () => webSettingsService.getByTitle(title),
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
