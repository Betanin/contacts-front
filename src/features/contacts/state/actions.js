import constants from './constants';

function init(){
    return {
            type: constants.INIT,
            payload: undefined,
        }
}

function loadContacts(payload){
    return {
            type: constants.LOAD_ALL,
            payload: {
                items: payload            
            }
        }
}

function filterContacts(payload){
    return {
            type: constants.APPLY_FILTER,
            payload: {
                filter: payload            
            }
        }
}

function getAll(){
    return {
            type: constants.FETCH_ALL,
            payload: undefined,
        }
}

function setSelectedItems(selectedItems){
    return {
            type: constants.SET_SELECTED_ITEMS,
            payload: {
                selectedItems
            },
        }
}

function postContact(values){
    return {
            type: constants.POST,
            payload: {
                values
            }
        }
}

export default {
    init,
    loadContacts,
    filterContacts,
    getAll,
    postContact,
    setSelectedItems,
};