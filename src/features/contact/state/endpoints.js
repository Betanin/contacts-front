import axios from 'axios';

const post = (values) => {
    return axios.post(`/contact`, values, { withCredentials: false });
}

const get = (id) => {
    return axios.get(`/contact/${id}`);
}

const put = (id, values) => {
    return axios.put(`/contact/${id}`, values, { withCredentials: false });
}

const remove = (id) => {
    return axios.delete(`/contact/${id}`);
}

export default {
    post,
    put,
    get,
    remove,
}