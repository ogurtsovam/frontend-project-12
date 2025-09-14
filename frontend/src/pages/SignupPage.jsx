import { useTranslation } from 'react-i18next'

import image from '../assets/susCat.jpg'
import SignupForm from '../forms/SignupForm'
import AuthButton from '../components/AuthButton'
import Header from '../components/Header'

const SignupPage = () => {
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
                  <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src={image} className="rounded-circle img-fluid w-75" alt={t('signup.title')}></img>
                    </div>
                    <SignupForm />
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

export default SignupPage
