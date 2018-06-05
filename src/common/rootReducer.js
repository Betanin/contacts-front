import { combineReducers } from 'redux';
import * as form from 'redux-form';
import * as router from './router/reducer';
import { messageReducer } from '../features/message';
import { loginReducer} from '../features/login';
import { contactReducer } from '../features/contact';
import { contactsReducer } from '../features/contacts';

const reducerMap = {
    form: form.reducer,
    router: router.reducer,
    messages: messageReducer,
    login: loginReducer,
    contact: contactReducer,
    contacts: contactsReducer,
};

export default combineReducers(reducerMap);