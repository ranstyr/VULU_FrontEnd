export /* @ngInject */ function tokenInterceptor($sessionStorage) {

  /**
   * attach the token to the header on each
   * request
   */
  function request(config) {
    const token = $sessionStorage.authData && $sessionStorage.authData.Token;

    if (token) {
      config.headers.Authorization = token;
      config.headers               = config.headers || {};
    }

    return config;
  }

  return {request};
}
