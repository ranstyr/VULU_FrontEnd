export /* @ngInject */ function loaderInterceptor($q, Loader) {

  function request(config) {

    if (checkUrl(config.url) < 1) {
      Loader.showLoader();
    }

    return config;
  }

  function response(data) {
    Loader.hideLoader();
    return data;
  }

  function responseError(err) {
    Loader.hideLoader();
    return $q.reject(err);
  }

  // These url paths are background requests, and a user shouldn't see they're loading
  function checkUrl(url) {
    const paths = ['Portfolios'];
    let temp    = 0;

    _.forEach(paths, path => {
      if (url.indexOf(path) != -1) {
        temp += 1;
      }
    });

    return temp;
  }

  return {request, response, responseError};
}
