import axiosInstance from './axiosInstance';

export const loginUser = async (email, password) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await axiosInstance.post('/auth/login', params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    });

    return response.data;
};

export const registerCandidate = async (userData) => {
    const payload = {...userData, role: 'CANDIDATE'};
    const response = await axiosInstance.post('/auth/candidate/register', payload);
    return response.data;
};

export const registerHr = async (userData) => {
    const payload = {...userData, role: 'HR'};
    const response = await axiosInstance.post('/auth/hr/register', payload);
    return response.data;
};
