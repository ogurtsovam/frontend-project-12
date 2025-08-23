import * as yup from 'yup';

const loginSchema = yup.object().shape({
    username: yup.string()
     .required('Required'),
    password: yup.string().required('Required'),
 });

export {loginSchema};