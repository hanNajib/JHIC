import { AdminApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await AdminApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        const response = await AdminApi.getById(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await AdminApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await AdminApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await AdminApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};
