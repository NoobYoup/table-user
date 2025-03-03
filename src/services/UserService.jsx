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

const deleteUser = (id) => {
    return axios.delete(`api/users/${id}`)
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };
