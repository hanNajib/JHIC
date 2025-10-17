import { StudentDataApi } from "../../ApiEndpoint";

export const get = async () => {
    try {
        const response = await StudentDataApi.get();
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const update = async (name, data) => {
    try {
        const response = await StudentDataApi.update(name, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const getByName = async (name) => {
    try {
        const response = await StudentDataApi.getByName(name);
        return response.data;
    } catch (error) {
        throw error;
    }
}