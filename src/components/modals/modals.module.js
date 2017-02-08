import { ModalsFactory } from './services/modals-factory';
import { Modal }         from './services/modal';

import { LoginController }        from './components/login/login';
import { SignUpController }       from './components/sign-up/sign-up';


export default angular.module('components.modal', [])
  .service('ModalsFactory', ModalsFactory)
  .service('Modal', Modal)
  .controller({
    LoginController,
    SignUpController
  });
