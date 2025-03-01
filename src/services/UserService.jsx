import axios from 'axios';

function fetchAllUser() {
    return axios.get('https://reqres.in/api/users?page=1');
}

export default fetchAllUser;
