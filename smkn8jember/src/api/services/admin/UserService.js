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
export const getByName = async (name) => {
    try {
        const response = await AdminApi.getByName(name);
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

export const restoreUser = async (id) => {
    try {
        const response = await AdminApi.restore(id);
        return response.data;
    } catch(error) {
        throw error;
    }
}

export const forceDeleteUser = async (id) => {
    try {
        const response = await AdminApi.forceDelete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkRestoreUser = async (ids) => {
    try {
        const response = await AdminApi.bulkRestore(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkForceDeleteUser = async (ids) => {
    try {
        const response = await AdminApi.bulkForceDelete(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};