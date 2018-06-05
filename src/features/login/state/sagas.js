import endpoints from './endpoints';
import actions from './actions';
import constants from './constants';
import { put, takeEvery, call } from 'redux-saga/effects';
import { messageActions } from '../../message';
import { contactsActions } from '../../contacts';
import { signupActions } from '../../signup';
import { push } from '../../../common/router/actions';
import auth from '../../../modules/auth';
import jwtDecode from 'jwt-decode';

function* init(){
    yield put(push('/login'));
}

function* login(action){

    const response = yield call(endpoints.post, action.payload.values);

    try {
        if(response.status === 200) {
            yield call(auth.authenticateUser, response.data.token);
            yield call(initSession, response.data.token, 'Successful signin!', 'Failed signin!');
        } else if (response.status >= 400)
            throw new Error(response.data.error);        
    } catch (error) {
        yield put(messageActions.sendMessage('ERROR', error.message || 'Failed signin!'));        
    }

}

function* recoverSession(redirect) {

    const jwtToken = yield call(auth.getJWTToken);

    if(jwtToken) {
        try {
            yield call(initSession, jwtToken, 'Session active!');
        } catch (err) {
            yield call(init);
        }
    } else if (redirect) {        
        yield call(init);
    }

}

function* initSession(jwtToken, sucessMessage, failMessage) {

    const decodedToken = yield call(jwtDecode, jwtToken);

    if(decodedToken) {        
        yield put(actions.initSession(decodedToken.data.email, decodedToken.data.name, jwtToken));
        if(sucessMessage)
            yield put(messageActions.sendMessage('INFO', sucessMessage));
        yield put(contactsActions.init());
    } else {
        if(failMessage)
            yield put(messageActions.sendMessage('ERROR', failMessage));
        yield call(init);
    }

}

function* signup(){
    yield put(signupActions.init());
}


export default function* rootSaga() {
    yield [
        takeEvery(constants.INIT, init),
        takeEvery(constants.RECOVER_SESSION, recoverSession),
        takeEvery(constants.LOGIN, login),
        takeEvery(constants.SIGNUP, signup),
    ];
}