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