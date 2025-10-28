import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
        const query = new URLSearchParams();

        for (const key in params) {
            const value = params[key];

            if (Array.isArray(value)) {
                value.forEach((v) => query.append(`${key}[]`, v));
            } else if (value !== undefined && value !== null && value !== "") {
                query.append(key, value);
            }
        }

        return query.toString();
    },
});

const axiosClient = axios.create({
    baseURL: '/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(config => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export { apiClient, axiosClient };