const apiPath = '/api/v1';

const getRoute = {
  loginApiPath: () => `${apiPath}/login`,
  signUpApiPath: () => `${apiPath}/signup`,
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  chatPagePath: () => '/',
};

export default getRoute;