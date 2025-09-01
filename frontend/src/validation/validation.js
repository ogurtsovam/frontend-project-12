import * as yup from 'yup';

const loginSchema = yup.object().shape({
    username: yup.string()
     .required('Required'),
    password: yup.string().required('Required'),
 });

const validateChannels = (channels, t) => {
  return yup.string()
  .min(3, t('errors.tooShort'))
  .max(20, t('errors.tooLong'))
  .required(t('errors.required'))
  .notOneOf(channels, t('errors.notOneOf'))
}

export { loginSchema, validateChannels };