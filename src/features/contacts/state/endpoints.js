import axios from 'axios';

export const get = () => {
    
    return axios.get('/contact');

}

const post = (values) => {
    
    return axios.post('/contact', values, { withCredentials: true });

}

export default {
    get,
    post
}