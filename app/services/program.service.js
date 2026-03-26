import api from "./server";

export const getCta = async (body) => {
  try {
    const data = await api.post(`/common_publish/commonPublish`, body);

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
