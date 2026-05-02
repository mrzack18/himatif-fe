import api from '../lib/axios';

// Login API
export const loginApi = (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
};
