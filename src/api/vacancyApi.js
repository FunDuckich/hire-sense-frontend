import axiosInstance from './axiosInstance';

export const getMyVacancies = async () => {
  const response = await axiosInstance.get('/vacancies/my');
  return response.data;
};

export const getAllVacancies = async () => {
  const response = await axiosInstance.get('/vacancies/');
  return response.data;
};