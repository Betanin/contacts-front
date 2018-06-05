import endpoints from './endpoints';
import actions from './actions';
import constants from './constants';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { push } from '../../../common/router/actions';
import { messageActions } from '../../message';

function* init() {

    yield all([
        put(push('/')),
        call(getContacts)
    ]);

}

function* getContacts() {
    try {
        const response = yield call(endpoints.get);

        if (response.status === 200) {
            yield put(actions.loadContacts(response.data));
        } else {
            throw new Error(response.data.error);
        }
    } catch (error) {
        yield put(messageActions.sendMessage('ERROR', error.message || 'List not refreshed!'));
    }
}

function* postContact(action) {
    try {
        const response = yield call(endpoints.post, action.payload.values);

        if (response.status === 200) {
            yield put(messageActions.sendMessage('INFO', 'Contact successfully saved!'));
        } else {
            throw new Error(response.data.error);
        }
    } catch (error) {
        yield put(messageActions.sendMessage('ERROR', error.message || 'Contact not saved!'));
    }
}

export default function* rootSaga() {
    yield [
        takeEvery(constants.INIT, init),
        takeEvery(constants.FETCH_ALL, getContacts),
        takeEvery(constants.POST, postContact),
    ]
}