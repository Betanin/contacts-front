import message from '../features/message/i18n';
import login from '../features/login/i18n';
import signup from '../features/signup/i18n';
import contact from '../features/contact/i18n';

const i18n = {
    'en-US': {
        message: message['en-US'],
        login: login['en-US'],
        signup: signup['en-US'],
        contact: contact['en-US'],
    },
    'pt-BR': {
        message: message['pt-BR'],
        login: login['pt-BR'],
        signup: signup['pt-BR'],
        contact: contact['pt-BR'],
    },
    'es-ES': {
        message: message['es-ES'],
        login: login['es-ES'],
        signup: signup['es-ES'],
        contact: contact['es-ES'],
    }
};

const flattenMessages = (nestedMessages, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

export default (locale) => flattenMessages(i18n[locale]);