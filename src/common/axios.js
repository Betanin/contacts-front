import axios from 'axios';

export default () => {

    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.validateStatus = (status) => status < 500;

}