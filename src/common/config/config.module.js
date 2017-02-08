import { i18nConfig }        from './i18n';
import { appConfig, appRun } from './app';

export default angular.module('si.config', [])
  .config(i18nConfig)
  .config(appConfig)
  .run(appRun);
