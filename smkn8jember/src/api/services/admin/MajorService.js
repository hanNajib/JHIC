import { MajorsApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await MajorsApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        const response = await MajorsApi.getById(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await MajorsApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await MajorsApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await MajorsApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restoreData = async (id) => {
    try {
        const response = await MajorsApi.restore(id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const forceDeleteData = async (id) => {
    try {
        const response = await MajorsApi.forceDelete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkRestoreData = async (ids) => {
    try {
        const response = await MajorsApi.bulkRestore(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkForceDeleteData = async (ids) => {
    try {
        const response = await MajorsApi.bulkForceDelete(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getByShortName = async (short_name) => {
    try {
        const response = await MajorsApi.getByShortName(short_name);
        return response.data;
    } catch (error) {
        throw error;
    }
}