import axiosInstance from './axiosInstance';

export const getMyApplications = async () => {
    const response = await axiosInstance.get('/applications/my');
    return response.data;
};

export const applyForVacancy = async (vacancyId, resumeFile) => {
    const formData = new FormData();
    formData.append('resume_file', resumeFile);

    const response = await axiosInstance.post(`/vacancies/${vacancyId}/apply`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getApplicationsForVacancy = async (vacancyId) => {
    const response = await axiosInstance.get(`/vacancies/${vacancyId}/applications`);
    return response.data;
};

export const getApplicationById = async (applicationId) => {
    const response = await axiosInstance.get(`/applications/${applicationId}`);
    return response.data;
};

export const getInterviewReport = async (sessionId) => {
    const response = await axiosInstance.get(`/interviews/${sessionId}/report`);
    return response.data;
};

export const startInterviewSession = async (applicationId) => {
    const response = await axiosInstance.post(`/applications/${applicationId}/start-interview`);
    return response.data;
};

export const getMyFeedback = async (applicationId) => {
    const response = await axiosInstance.get(`/applications/${applicationId}/feedback`);
    return response.data;
};