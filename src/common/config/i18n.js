export /* @ngInject */ function i18nConfig($translateProvider) {
  $translateProvider.useLoader('translationLoader', {});
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.fallbackLanguage('en-US'); // In cases a specific translation is missing
  $translateProvider.registerAvailableLanguageKeys(['en-US', 'ja-JP', 'ru-RU', 'zh-CHT', 'zh-CN'], {
    'en*': 'en-US',
    'ja*': 'ja-JP',
    'ru*': 'ru-RU',
    'zh-CHT': 'zh-CHT',
    'zh_CHT': 'zh_CHT',
    'zh-CN': 'zh-CN',
    'zh_CN': 'zh_CN',
    'zh': 'zh-CN'
  });
}