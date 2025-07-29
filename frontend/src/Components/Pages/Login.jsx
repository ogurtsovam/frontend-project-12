import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import i18next from 'i18next';
import resources from '../../locales/index.js';

const i18nextInstance = i18next.createInstance()

  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  })

const state = {
  formState: 'filling',
  submitForm: {
    error: '',
  },
}

const SignupSchema = yup.object().shape({
  userName: yup.string().min(2, i18nextInstance.t('form.errors.tooShort')).max(50, i18nextInstance.t('form.errors.tooLong')).required(i18nextInstance.t('form.errors.notEmpty')),
  password: yup.string().min(8, i18nextInstance.t('form.errors.tooShort')).max(16, i18nextInstance.t('form.errors.tooLong')).required(i18nextInstance.t('form.errors.notEmpty')),
});

const renderForm = () => {
  return (
    <>
    <Formik
      initialValues={{
        userName: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={ (values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4" >{i18nextInstance.t('form.signup.title')}</h1>
          <div class="form-floating mb-3">
            <label htmlFor="userName">{i18nextInstance.t('form.signup.username')}</label>
            <Field name="userName" text={i18nextInstance.t('form.signup.username')} className="form-control" />
            {errors.userName && touched.userName ? (
              <div>{errors.userName}</div>
            ) : null}
          </div>
          <div class="form-floating mb-4">
            <label htmlFor="userName">{i18nextInstance.t('form.signup.password')}</label>
            <Field name="password" type="password" id="password" className="form-control" />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{i18nextInstance.t('form.signup.title')}</button>
        </Form>
      )}
    </Formik>
  </>
  )
}

export const Login = () => {
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
            </div>
          </nav>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="src/assets/avatar.jpg" className="rounded-circle" alt="Войти" />
                  </div>
                  <>
                    {renderForm()}
                  </>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>{i18nextInstance.t('form.errors.noAccaunt')} </span>
                    <a href="/">{i18nextInstance.t('form.register')}</a>
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
