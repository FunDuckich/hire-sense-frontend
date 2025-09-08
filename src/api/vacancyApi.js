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