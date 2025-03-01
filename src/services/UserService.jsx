import axios from '@/services/customize-axios';

function fetchAllUser(page) {
    return axios.get(`api/users?page=${page}`);
}

export default fetchAllUser;
