import i18next from 'i18next';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageTwo } from './Pages.jsx';
import { PageNotFound } from './Pages/PageNotFound.jsx';
import { Login } from './Pages/Login.jsx';
import { Default } from './Pages/Default.jsx';
import '../assets/application.scss';
import resources from '../locales/index.js';

const i18nextInstance = i18next.createInstance()

  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  })
    .then(() => {
      yup.setLocale({
        string: {
          url: () => ({ key: 'invalidLink' }),
          required: () => ({ key: 'notEmpty' }),
        },
        mixed: {
          notOneOf: () => ({ key: 'addedLink' }),
        },
      })
    })

const state = {
  formState: 'filling',
  submitForm: {
    error: '',
  },
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Default />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
