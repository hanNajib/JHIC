import { axiosClient, apiClient } from "../ApiClient";
import { AuthApi } from "../ApiEndpoint";

export const login = async (login, password) => {
    try {
        await AuthApi.csrf();
        const response = await AuthApi.login({
            login: login,
            password: password
        });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Network Error' };
    }
}

export const logout = async () => {
    try {
        const response = await AuthApi.logout();
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { message: 'Network Error' };
    }
}

export const fetchUser = async () => {
    try {
        const response = await AuthApi.fetchUser();
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
