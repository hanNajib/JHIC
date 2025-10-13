import { WebSettingsApi } from "../../ApiEndpoint";

export const getSettings = async () => {
    try {
        const response = await WebSettingsApi.getSettings();
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const updateSettings = async (title, data) => {
    try {
        const response = await WebSettingsApi.updateSetting(title, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getByTitle = async (title) => {
    try {
        const response = await WebSettingsApi.getByTitle(title);
        return response.data;
    } catch (error) {
        throw error;
    }
}