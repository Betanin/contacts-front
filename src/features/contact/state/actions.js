import constants from './constants';

function init(clearData = false) {
    
    return {
        type: constants.INIT,
        payload: {
            clearData,
        }
    }

}

function get(id) {

    return {
        type: constants.GET,
        payload: {
            id,
        }
    }

}

function remove(id) {

    return {
        type: constants.REMOVE,
        payload: {
            id,
        }
    }

}

function load(id, name, company, email, phone) {

    return {
        type: constants.LOAD,
        payload: {
            id,
            name,
            company,
            email,
            phone,
        }
    }

}

function post(values) {

    return {
        type: constants.POST,
        payload: {
            values,
        }
    }

}

function put(id, values) {

    return {
        type: constants.PUT,
        payload: {
            id,
            values,
        }
    }

}

function cancel() {

    return {
        type: constants.CANCEL,
        payload: undefined,
    }

}

export default {
    init,
    load,
    get,
    post,
    put,
    cancel,
    remove,
}