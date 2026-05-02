import api from '../lib/axios';

export interface UpdateUserData {
    full_name?: string;
    email?: string;
    password?: string;
    role?: string;
}

export interface CreateUserData extends UpdateUserData {
    full_name: string;
    email: string;
    password: string;
    role: string;
}

// Get All Users (Admin)
export const getAllUsersApi = () => {
    return api.get('/users');
}

// Create User (Admin)
export const createUserApi = (data: CreateUserData) => {
    return api.post('/users', data);
}

// Update User
export const updateUserApi = (id: number, data: UpdateUserData) => {
    return api.put(`/users/${id}`, data);
};

// Get User By ID
export const getUserByIdApi = (id: number) => {
    return api.get(`/users/${id}`);
};

// Delete User (Admin)
export const deleteUserApi = (id: number) => {
    return api.delete(`/users/${id}`);
}
