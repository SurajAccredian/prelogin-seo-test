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

/**
 * Creates a user account specifically from the Free Courses page.
 * Calls /free-course/register — does NOT set category or create step_tracker.
 * Fires two Free-Courses-specific emails via the email-worker-service.
 */
export const createFreeCourseUser = async (body) => {
    try {
        const response = await api.post(`/free-course/register`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * For already-authenticated users visiting a free-course page.
 * Checks enrollment, creates it if missing, and fires emails.
 * Calls /free-course/enroll.
 */
export const enrollFreeCourseUser = async (body) => {
    try {
        const response = await api.post(`/free-course/enroll`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Checks if the user is enrolled in the free course without creating enrollment.
 * Calls /free-course/check-enrollment.
 */
export const checkFreeCourseEnrollment = async (body) => {
    try {
        const response = await api.post(`/free-course/check-enrollment`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches the SSO JWT redirect url for Thinkific.
 */
export const fetchThinkificUrl = async (body) => {
    try {
        const response = await api.post(`/free-course/fetch-thinkific-url`, body);
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

/**
 * Saves exam acknowledgment status (0 or 1) in database.
 */
export const saveExamAcknowledgement = async (body) => {
    try {
        const response = await api.post(`/exam-interest/acknowledgement`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches exam acknowledgment status (0 or 1) from database.
 */
export const getExamAcknowledgement = async (body) => {
    try {
        const response = await api.post(`/exam-interest/get-acknowledgement`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
};