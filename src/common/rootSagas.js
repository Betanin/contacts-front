import { all } from 'redux-saga/effects';
import { loginSagas } from '../features/login';
import { signupSagas } from '../features/signup';
import { contactsSagas } from '../features/contacts';
import { contactSagas } from '../features/contact';
import { messageSagas } from '../features/message';

export default function* rootSagas() {
    yield all([
        loginSagas(),
        signupSagas(),
        contactsSagas(),
        contactSagas(),
        messageSagas(),
    ]);
}