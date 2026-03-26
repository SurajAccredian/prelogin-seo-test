import api from "./server";

export const careersPortal = async ({ body }) => {
  try {
    const { data } = await api.post(`/career/uploadCareerResume`, body);
    return data;
  } catch (error) {
    throw error;
  }
};
