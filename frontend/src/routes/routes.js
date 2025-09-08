const api = '/api/v1'

export default {
  loginPage: '/login',
  chatPage: '/',
  signupPage: '/signup',
  signupPath: () => [api, 'signup'].join('/'),
  loginPath: () => [api, 'login'].join('/'),
  channelsPath: () => [api, 'channels'].join('/'),
  messagesPath: () => [api, 'messages'].join('/'),
  chatPath: () => api,
}
