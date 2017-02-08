/**
 * This Factory handles async loading of translation objects
 *
 * Reference:
 * https://github.com/angular-translate/angular-translate/wiki/Asynchronous-loading
 */

export /* @ngInject */ function translationLoader() {
  /**
   * Fetch the translations object for a specific language (or the default one)
   *
   * @param  {string} lang Language code (e.g. 'en-US')
   * @return {Object}      Promise
   */
  function loadTranslations(lang) {
    //todo ran - need to implement
    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (1) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });
    return promise;
  }

  /**
   * Translations handler, called when using `$translate.use`
   *
   * @param  {Object} options `$translate.use` options (e.g. { key: 'en-US' })
   * @return {Object}         Promise
   */
  return function (options) {
    return loadTranslations(options.key);
  };
}
