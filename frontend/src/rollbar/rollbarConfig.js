const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

export default rollbarConfig;