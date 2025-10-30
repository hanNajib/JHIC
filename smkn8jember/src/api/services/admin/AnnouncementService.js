import { AnnouncementApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await  AnnouncementApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        const response = await  AnnouncementApi.getById(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await  AnnouncementApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await  AnnouncementApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await  AnnouncementApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restoreData = async (id) => {
    try {
        const response = await AnnouncementApi.restore(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const forceDeleteData = async (id) => {
    try {
        const response = await AnnouncementApi.forceDelete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkRestoreData = async (ids) => {
    try {
        const response = await AnnouncementApi.bulkRestore(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const bulkForceDeleteData = async (ids) => {
    try {
        const response = await AnnouncementApi.bulkForceDelete(ids);
        return response.data;
    } catch (error) {
        throw error;
    }
};