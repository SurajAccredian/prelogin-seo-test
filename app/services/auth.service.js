import api from "./server";


export const verifyEmail = async (body) => {
    try {
        const response = await api.post(`/checkEmail`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const generateUserLoginOtp = async (body) => {
    try {
        const response = await api.post(`/generateUserLoginOtp`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const genrateOtpExistingUser = async (body) => {
    try {
        const response = await api.post(`/genrateOtp`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyPassword = async (body) => {
    try {
        const response = await api.post(`/checkPassword`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyOtp = async (body) => {
    try {
        const response = await api.post(`/checkOtp`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const createUser = async (body) => {
    try {
        const response = await api.post(`/createUser`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};



export const masterVerifyEmail = async (body) => {
    try {
        const response = await api.post(`/master/masterEmailVerification`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const masterVerifyOtp = async (body) => {
    try {
        const response = await api.post(`/master/masterOtpVerification`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};