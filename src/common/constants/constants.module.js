import { LOADING_TYPES } from './loading-types';
import { LANGUAGES_MAP } from './languages';
//import { ORIGIN_TYPES }  from './origin-types';
import { API_URLS }      from './api-urls';
import { PATTERNS }      from './patterns';
import { GLOBALS }       from './globals';
import { ENV }           from './env';

export default angular.module('si.constants', [])
  .constant('LOADING_TYPES', LOADING_TYPES)
  .constant('LANGUAGES_MAP', LANGUAGES_MAP)
  //.constant('ORIGIN_TYPES', ORIGIN_TYPES)
  .constant('API_URLS', API_URLS)
  .constant('PATTERNS', PATTERNS)
  .constant('GLOBALS', GLOBALS)
  .constant('ENV', ENV);
