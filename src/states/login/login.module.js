import { LoginController } from './login.js';
import loginemplate       from './login.html';

/* @ngInject */
function loginRoutes($stateProvider) {
  $stateProvider
    .state('home.login', {
      url: '/login',
      template: loginemplate,
      controller: 'LoginController',
      controllerAs: 'login',
      resolve: {
        // Wait for `userData` before running
/*
        userData: ($q, $state, UserData, Auth) => {
          if (Auth.getAuthData()) {
            // If already logged in, redirect to Dashboard
            return UserData.getUserData()
              .then(user => {
                // TODO: Change state here
                return $q.resolve();
              }).catch(err => {
                Auth.logout();
                return null;
              });
          }

          return null;
        },
*/
        // Wait for `attributes` before running
/*
        attributes: (userData, GroupAttributes, LOADING_TYPES, AppState, Auth) => {
          /!*          // TODO: Uncomment this after integration with BE on Auth
           if (Auth.getAuthData()) {
           return null;
           }*!/

          AppState.setPreLoginMode(true);
          return GroupAttributes.getGroupAttributes(LOADING_TYPES.preLogin)
            // In case of an error, don't fail the page load
            .catch(err => null);
        },
*/
        // Wait for `translations` before running
/*
        translations: ($translate, attributes, GroupTranslations) => {
          // Flush cached translations
          return $translate.refresh().then(() => $translate.use(GroupTranslations.getCurrentLanguage()));
        }
*/
      }
    });
}

export default angular.module('states.login', [])
  .controller('LoginController', LoginController)
  .config(loginRoutes);
