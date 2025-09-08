import React from 'react'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'

import { setAuth } from "../slices/authSlice"
import {getLoginSchema} from '../validation/validation.js'
import routes from '../routes/routes.js'

const LoginForm = () => {
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
      username: "",
      password: "",
    },
    validationSchema: getLoginSchema(t),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values)
        const newToken = res.data
        dispatch(setAuth(newToken))

        const from = location.state?.from || '/'
        navigate(from)
      }
      catch (err) {
        formik.setSubmitting(false)
        if (err.response.status === 401) {
          formik.setFieldError('username', ' ')
          formik.setFieldError('password', t('errors.usernameOrPasswordIsIncorrect'))
          return
        }
        if (err.isAxiosError ) {
          inputRef.current.select()
          return
        }
        toast.error(t('errors.connectionError'))
      }
    },
  })
  return (
    <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('login.form.title')}</h1>

      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          placeholder="Ваш ник"
          id="username"
          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
          ref={inputRef}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="username">{t('login.form.username')}</label>
        {formik.touched.username && formik.errors.username && (
          <div className="text-danger">{formik.errors.username}</div>
        )}
      </div>

      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          placeholder="Пароль"
          type="password"
          id="password"
          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="form-label" htmlFor="password">{t('login.form.password')}</label>
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger">{formik.errors.password}</div>
        )}
      </div>

      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        {t('login.form.title')}
      </button>
    </form>
  )
}

export default LoginForm
