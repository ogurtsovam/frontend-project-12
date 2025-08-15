const apiPath = '/api/v1';

const getRoute = {
  loginApiPath: () => [apiPath, 'login'].join('/'),
  signUpApiPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  chatPagePath: () => '/',
};

export default getRoute;