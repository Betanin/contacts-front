import constants from './constants';

export default (state = {}, action) => {

    switch (action.type) {
        case constants.LOAD:
            return {
                data: action.payload,
            };
        default:
            return state;
    }

}