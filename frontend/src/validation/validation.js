import * as yup from 'yup'

const getLoginSchema = t => yup.object().shape({
  username: yup.string().required(t('errors.required')),
  password: yup.string().required(t('errors.required')),
})

const getSignupSchema = t => yup.object().shape({
  username: yup.string().min(3, t('errors.tooShort')).max(20, t('errors.tooLong')).required(t('errors.required')),
  password: yup.string().min(6, t('errors.minSymbols')).required(t('errors.required')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], t('errors.passwordsMustMatch'))
    .required(t('errors.required')),
})

const validateChannels = (channels, t) => {
  return yup.string()
    .min(3, t('errors.tooShort'))
    .max(20, t('errors.tooLong'))
    .required(t('errors.required'))
    .notOneOf(channels, t('errors.notOneOf'))
}

export { getLoginSchema, validateChannels, getSignupSchema}
