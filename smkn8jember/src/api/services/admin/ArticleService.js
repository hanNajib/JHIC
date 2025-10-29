import { ArticleApi } from "../../ApiEndpoint";

export const get = async (params) => {
    try {
        const response = await  ArticleApi.get(params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBySlug = async (slug) => {
    try {
        const response = await  ArticleApi.getBySlug(slug);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBySlugNoView = async (slug) => {
    try {
        const response = await  ArticleApi.getBySlugNoView(slug);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await  ArticleApi.create(data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const update = async (id, data) => {
    try {
        const response = await  ArticleApi.update(id, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await  ArticleApi.delete(id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const restoreData = async (id) => {
    try {
        const response = await ArticleApi.restore(id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateStatus = async (id, status) => {
    try {
        const response = await ArticleApi.updateStatus(id, status);
        return response.data;
    } catch (error) {
        throw error;
    }
};
