import constants from './constants';

function init() {
    
    return {
        type: constants.INIT,
        payload: undefined,
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

function cancel() {

    return {
        type: constants.CANCEL,
        payload: undefined,
    }

}

export default {
    init,
    post,
    cancel
}