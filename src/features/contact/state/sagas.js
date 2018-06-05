import endpoints from './endpoints';
import constants from './constants';
import actions from './actions';
import { put, takeEvery, call } from 'redux-saga/effects';
import { messageActions } from '../../message';
import { push } from '../../../common/router/actions';
import { contactsActions } from '../../contacts';
 
function* init(action){
    if(action && action.payload.clearData) {
        yield put(actions.load());
    }
    yield put(push('/contact'));
}

function* post(action){

    const response = yield call(endpoints.post, action.payload.values);

    try {
        if(response.status === 200) {
            yield put(messageActions.sendMessage('INFO', 'Successfully created!'));
            yield put(contactsActions.init());
        } else if (response.status >= 400)
            throw new Error(response.data.error);        
    } catch (error) {
        yield put(messageActions.sendMessage('ERROR', error.message || 'Contact inclusion failed!'));        
    }

}

function* update(action){

    const response = yield call(endpoints.put, action.payload.id, action.payload.values);

    try {
        if(response.status === 200) {
            yield put(messageActions.sendMessage('INFO', 'Successfully updated!'));
            yield put(contactsActions.init());
        } else if (response.status >= 400)
            throw new Error(response.data.error);        
    } catch (error) {
        yield put(messageActions.sendMessage('ERROR', error.message || 'Contact updating failed!'));        
    }

}

function* get(action){

    const response = yield call(endpoints.get, action.payload.id);    
    
    try {
        if(response.status === 200) {
            yield put(actions.load(
                response.data._id,
                response.data.name,
                response.data.company,
                response.data.email,
                response.data.phone,                    
            ));
            yield put(actions.init());
        } else if (response.status >= 400)
            throw new Error(response.data.error);        
    } catch (error) {
        yield put(messageActions.sendMessage('ERROR', error.message || 'Contact loading failed!'));        
    }

}

function* remove(action){

    const response = yield call(endpoints.remove, action.payload.id);    
    
    try {
        if(response.status === 200) {
            yield put(messageActions.sendMessage('INFO', 'Successfully removed!'));
            yield put(contactsActions.init());
        } else if (response.status >= 400)
            throw new Error(response.data.error);        
    } catch (error) {
        yield put(messageActions.sendMessage('ERROR', error.message || 'Contact removal failed!'));        
    }

}

function* cancel(){
    yield put(contactsActions.init()); 
}

export default function* rootSaga() {
    yield [
        takeEvery(constants.INIT, init),
        takeEvery(constants.POST, post),
        takeEvery(constants.PUT, update),
        takeEvery(constants.CANCEL, cancel),
        takeEvery(constants.GET, get),
        takeEvery(constants.REMOVE, remove),        
    ];
}