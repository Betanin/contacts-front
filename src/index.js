import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import registerServiceWorker from './common/registerServiceWorker';
import storeCreator from './common/storeCreator';
import messages from './common/messages';
import axiosConfig from './common/axios';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';
import Root from './Root';

axiosConfig();

const store = storeCreator();

addLocaleData([...en, ...es, ...pt]);

const locale =
    (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US';

ReactDOM.render(
    <IntlProvider locale={locale} messages={messages(locale)} >
        <Root store={store} />
    </IntlProvider>,
    document.getElementById('root')
);

registerServiceWorker();
