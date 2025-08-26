/* eslint-disable functional/no-expression-statement */
import { Provider } from "react-redux"
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App';
import resources from './locales/locales.js';
import {store} from './store/store.js' 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
  );
};

export default init;