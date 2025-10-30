import { SubjectApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await SubjectApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        const response = await SubjectApi.getById(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await SubjectApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await SubjectApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await SubjectApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restoreData = async (id) => {
    try {
        const response = await SubjectApi.restore(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forceDeleteData = async (id) => {
    try {
        const response = await SubjectApi.forceDelete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkRestoreData = async (ids) => {
    try {
        const response = await SubjectApi.bulkRestore(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkForceDeleteData = async (ids) => {
    try {
        const response = await SubjectApi.bulkForceDelete(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};