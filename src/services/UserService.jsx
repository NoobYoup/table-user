import axios from '@/services/customize-axios';

const fetchAllUser = (page) => {
    return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post('api/users', { name, job });
};

const putUpdateUser = (userId, name, job) => {
    return axios.put(`api/users/${userId}`, { name, job });
};

export { fetchAllUser, postCreateUser, putUpdateUser };
