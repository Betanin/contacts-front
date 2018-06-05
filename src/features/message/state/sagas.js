import actions from './actions';
import constants from './constants';
import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import uuid from 'uuid/v1';

function* sendMessage(action) {

    const { type, message } = action.payload;
    const id = yield uuid();    

    yield put(actions.showMessage(type, id, message));

    yield call(delay, 5000);

    yield put(actions.hideMessage(id));

}

function* watchSendMessage() {
    yield takeEvery(constants.SEND, sendMessage)
}

export default function* rootSaga() {
    yield watchSendMessage();
}