import { ChanceCarrierApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await  ChanceCarrierApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        const response = await  ChanceCarrierApi.getById(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await  ChanceCarrierApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await  ChanceCarrierApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await  ChanceCarrierApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restoreData = async (id) => {
    try {
        const response = await ChanceCarrierApi.restore(id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const forceDeleteData = async (id) => {
    try {
        const response = await ChanceCarrierApi.forceDelete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkRestoreData = async (ids) => {
    try {
        const response = await ChanceCarrierApi.bulkRestore(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkForceDeleteData = async (ids) => {
    try {
        const response = await ChanceCarrierApi.bulkForceDelete(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};