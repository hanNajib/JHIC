import { FacilityApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await FacilityApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        const response = await FacilityApi.getById(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await FacilityApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await FacilityApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await FacilityApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restoreData = async (id) => {
    try {
        const response = await FacilityApi.restore(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forceDeleteData = async (id) => {
    try {
        const response = await FacilityApi.forceDelete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkRestoreData = async (ids) => {
    try {
        const response = await FacilityApi.bulkRestore(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkForceDeleteData = async (ids) => {
    try {
        const response = await FacilityApi.bulkForceDelete(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};