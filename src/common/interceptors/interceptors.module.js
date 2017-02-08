import { tokenInterceptor }  from './token-interceptor';
import { loaderInterceptor } from './loader-interceptor'

function interceptorsConfig($httpProvider) {
  $httpProvider.interceptors.push(tokenInterceptor);
  $httpProvider.interceptors.push(loaderInterceptor);
}

export default angular.module('si.interceptors', [])
    .config(interceptorsConfig)
