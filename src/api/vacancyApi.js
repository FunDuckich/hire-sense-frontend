import axiosInstance from './axiosInstance';

export const getMyVacancies = async () => {
    const response = await axiosInstance.get('/vacancies/my');
    return response.data;
};

export const getAllVacancies = async () => {
    const response = await axiosInstance.get('/vacancies/');
    return response.data;
};

export const getVacancyById = async (id) => {
    const response = await axiosInstance.get(`/vacancies/${id}`);
    return response.data;
};

export const createVacancy = async (vacancyData) => {
    const response = await axiosInstance.post('/vacancies/', vacancyData);
    return response.data;
};

export const updateVacancy = async (id, vacancyData) => {
    const response = await axiosInstance.put(`/vacancies/${id}`, vacancyData);
    return response.data;
};

export const parseVacancyFromFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post('/vacancies/parse-from-file', formData, {
        headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
};