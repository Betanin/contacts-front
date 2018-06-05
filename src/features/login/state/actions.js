import constants from './constants';

function init() {
    
    return {
        type: constants.INIT,
        payload: undefined,
    }

}

function initSession(email, name, token) {

    return {
        type: constants.INIT_SESSION,
        payload: {
            email,
            name,
            token
        }
    }

}

function recoverSession(redirect = false) {

    return {
        type: constants.RECOVER_SESSION,
        payload: {
            redirect
        }
    }

}

function login(values, ...postLoginOperations) {

    return {
        type: constants.LOGIN,
        payload: {
            values,
            postLoginOperations
        }
    }

}

function signup(...preSignupOperations) {

    return {
        type: constants.SIGNUP,
        payload: {
            preSignupOperations
        }
    }

}

export default {    
    init,
    initSession,
    recoverSession,
    login,
    signup
}