import axios from 'axios';

const post = (values) => {
    
    return axios.post(`/login`, values, { withCredentials: false });

}

export default {
    post
}