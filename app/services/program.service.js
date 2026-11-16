
import api from "./server";

export const getCta = async (body) => {
  try {
    const data = await api.post(`/common_publish/commonPublish`, body);

    return data;
  } catch (error) {
    throw error;
  }
};

export const submitLandingPageLead = async (body) => {
  try {
    const data = await api.post(`/bot-leads/request-consultation-api`, body);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getBrochureCta = async (body) => {
  try {
    const data = await api.post(`/cta/get-brochure`, body);

    return data;
  } catch (error) {
    throw error;
  }
};

export const programSignUp = async (body) => {
  try {
    const { data } = await api.post(`/payment-signup`, body);

    return data;
  } catch (error) {
    throw error;
  }
};


export const getApplicationDetails = async (body) => {
  try {
    const response = await api.post(
      '/program/application-details',
      body
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create application step tracker
export const createApplicationStepTracker = async (body) => {
  try {
    const response = await api.post(
      '/program/create-application-steptracker',
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to fetch live program registration status by PID
 * Endpoint: GET /program/:pid/registration-status
 */
export const getProgramRegistrationStatus = async (pid) => {
  try {
    const { data } = await api.get(`/program/${pid}/registration-status`);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Service function to fetch live bulk program registration statuses
 * Endpoint: GET /program/bulk/registration-status?pids=...
 */
export const getBulkProgramRegistrationStatus = async (pids) => {
  try {
    const params = pids ? { pids: Array.isArray(pids) ? pids.join(",") : pids } : {};
    const { data } = await api.get(`/program/bulk/registration-status`, { params });
    return data;
  } catch (error) {
    throw error;
  }
};

