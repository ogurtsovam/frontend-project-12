import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import LoginForm from '../forms/LoginForm'
import Header from '../components/Header'
import image from '../assets/wowCat.jpg'
import routes from '../routes/routes'
import AuthButton from '../components/AuthButton'

const LoginPage = () => {
  const { t } = useTranslation()
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header authButton={<AuthButton />} />
          <div className="container-fluid h-100 mt-5">
            <div className="row justify-content-center align-content-center">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src={image} className="rounded-circle" alt="Войти" style={{ width: '300px', height: 'auto' }}></img>
                    </div>
                    <LoginForm />
                  </div>
                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>
                        {t('login.noAccount')}
                        {' '}
                      </span>
                      <Link to={routes.signupPage}>{t('login.registration')}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
