import constants from './constants';

export default (state = {}, action) => {

    switch (action.type) {
        case constants.INIT_SESSION:
            return {
                email: action.payload.email,
                name: action.payload.name,
                token: action.payload.token
            };
        default:
            return state;
    }

}