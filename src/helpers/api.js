import axiosInstance from './api.config';

export const signup = async (payload) => {
    try {
        const result = await axiosInstance.post(`/auth/register`, payload);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};

export const login = async (payload) => {
    try {
        const result = await axiosInstance.post(`/auth/login`, payload);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};
