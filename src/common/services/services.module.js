import { Auth }     from './auth';
import { Signup }   from './sign-up';
import { Network }  from './network';


//Factories
import  { translationLoader } from './translation-loader'


export default angular.module('si.services', [])
    .service('Auth', Auth)
    .service('Signup', Signup)
    .service('Network', Network)

    //Factories
    .factory('translationLoader', translationLoader);