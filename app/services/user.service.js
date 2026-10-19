import api from "./server";

export const signup = async (body) => {
  try {
    const data = await api.post(`/signup`, body);

    return data;
  } catch (error) {
    throw error;
  }
};
