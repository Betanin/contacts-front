import axios from 'axios';

function authenticateUser(jwtToken) {
    localStorage.setItem('jwtToken', jwtToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
}

function isUserAuthenticated() {
    return localStorage.getItem('jwtToken') !== null;
}

function deauthenticateUser() {
    localStorage.removeItem('jwtToken');
}

function getJWTToken() {
    const jwtToken = localStorage.getItem('jwtToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    return jwtToken;
}

export default {
    authenticateUser,
    isUserAuthenticated,
    deauthenticateUser,
    getJWTToken
}