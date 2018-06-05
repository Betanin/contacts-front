import axios from 'axios';

const post = (values) => {
    
    return axios.post(`/signup`, values, { withCredentials: false });

}

export default {
    post
}