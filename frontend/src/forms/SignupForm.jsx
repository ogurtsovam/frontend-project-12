import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

import { setAuth } from '../slices/authSlice'
import routes from '../routes/routes'
import { getSignupSchema } from '../validation/validation'

const SignupForm = () => {
  const { t } = useTranslation()
  const inputRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getSignupSchema(t),
    onSubmit: async (values) => {
      try {
        if (leoProfanity.check(values.username)) {
          toast.error(t('errors.badName'))
          return
        }
        const res = await axios.post(routes.signupPath(), { username: values.username, password: values.password })
        const { token, username } = res.data
        dispatch(setAuth({ token, username }))

        const from = location.state?.from || '/'
        navigate(from)
      }
      catch (err) {
        formik.setSubmitting(false)
        if (err.response.status === 401) {
          inputRef.current.select()
          return
        }
        if (err.response.status === 409) {
          formik.setFieldError('username', t('signup.userExists'))
          return
        }
        toast.error(t('errors.connectionError'))
      }
    },
  })
  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signup.title')}</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required=""
          id="username"
          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
          ref={inputRef}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="form-label" htmlFor="username">{t('signup.username')}</label>
        {formik.touched.username && formik.errors.username && (
          <div className="text-danger">{formik.errors.username}</div>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          name="password"
          aria-describedby="passwordHelpBlock"
          required=""
          autoComplete="new-password"
          type="password"
          id="password"
          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="form-label" htmlFor="password">{t('signup.password')}</label>
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger">{formik.errors.password}</div>
        )}
      </div>
      <div className="form-floating mb-4">
        <input
          name="confirmPassword"
          required=""
          autoComplete="new-password"
          type="password"
          id="confirmPassword"
          className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="form-label" htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="text-danger">{formik.errors.confirmPassword}</div>
        )}
      </div>
      <button type="submit" className="w-100 btn btn-outline-primary" onSubmit={formik.handleSubmit}>{t('signup.submit')}</button>
    </form>
  )
}

export default SignupForm
