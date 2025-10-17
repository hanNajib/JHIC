import { StaffApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await StaffApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        const response = await StaffApi.getById(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStructure = async () => {
    try {
        const response = await StaffApi.getStructure();
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await StaffApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await StaffApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await StaffApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restoreData = async (id) => {
    try {
        const response = await StaffApi.restore(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};