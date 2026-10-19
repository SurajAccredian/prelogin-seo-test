import api from "./server";

/**
 * Service function to report an issue to the dev team
 */
export const reportIssue = async ({ body }) => {
    try {
        const { data } = await api.post(`/students/send-report-email`, body);
        return data;
    } catch (error) {
        throw error;
    }
};
