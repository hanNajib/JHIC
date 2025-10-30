import { CategoryApi } from "../../ApiEndpoint";

export const get = async (params) => {
  try {
    const response = await CategoryApi.get(params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await CategoryApi.getById(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const create = async (data) => {
  try {
    const response = await CategoryApi.create(data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, data) => {
  try {
    const response = await CategoryApi.update(id, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (id) => {
  try {
    const response = await CategoryApi.delete(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const restoreData = async (id) => {
  try {
    const response = await CategoryApi.restore(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forceDeleteData = async (id) => {
  try {
    const response = await CategoryApi.forceDelete(id);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bulkRestoreData = async (ids) => {
  try {
    const response = await CategoryApi.bulkRestore(ids);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bulkForceDeleteData = async (ids) => {
  try {
    const response = await CategoryApi.bulkForceDelete(ids);
    return response.data;
  } catch (error) {
    throw error;
  }
};
