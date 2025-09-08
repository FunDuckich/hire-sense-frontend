import axiosInstance from './axiosInstance';

export const getMyApplications = async () => {
  const response = await axiosInstance.get('/applications/my');
  return response.data;
};