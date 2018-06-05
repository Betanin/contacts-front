import endpoints from './endpoints';
import constants from './constants';
import { put, takeEvery, call } from 'redux-saga/effects';
import { messageActions } from '../../message';
import { push } from '../../../common/router/actions';
import { loginActions } from '../../login';
 
function* init(){
    yield put(push('/signup'));
}

function* post(action){

    const response = yield call(endpoints.post, action.payload.values);

    try {
        if(response.status === 200) {
            yield put(messageActions.sendMessage('INFO', 'Successfully signed up!'));
            yield put(loginActions.init());
        } else if (response.status >= 400)
            throw new Error(response.data.error);        
    } catch (error) {
        let message = error.message;
        if(response && response.message)
            message = response.message;
        yield put(messageActions.sendMessage('ERROR', message || 'Signup failed!'));        
    }

}

function* cancel(){
    yield put(loginActions.init()); 
}

export default function* rootSaga() {
    yield [
        takeEvery(constants.INIT, init),
        takeEvery(constants.POST, post),
        takeEvery(constants.CANCEL, cancel)
    ];
}