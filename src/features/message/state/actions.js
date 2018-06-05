import constants from './constants';

function sendMessage(type, message) {
    return {
            type: constants.SEND,
            payload: {
                type,
                message
            }
        }
}

function showMessage(type, id, message) {
    return {
            type: constants.SHOW,
            payload: {
                id,
                type,
                message
            }
        }
}

function hideMessage(id) {
    return {
            type: constants.HIDE,
            payload: {
                id
            }
        }
}

export default {
    sendMessage,
    showMessage,
    hideMessage
}