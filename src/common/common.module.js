import constants     from './constants/constants.module';
import directives    from './directives/directives.module';
import services      from './services/services.module';
import filters       from './filters/filters.module';
import decorators    from './decorators/decorators.module';
import interceptors  from './interceptors/interceptors.module';
import configuration from './config/config.module';

export default angular.module('si.common', [
  constants.name,
  directives.name,
  services.name,
  filters.name,
  decorators.name,
  interceptors.name,
  configuration.name
]);
