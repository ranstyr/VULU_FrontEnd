import { siLoader } from './component/loader';
import { Loader }   from './services/loader';


export default angular.module('components.loader', [])
  .directive({
    siLoader
  })
  .service('Loader', Loader)
