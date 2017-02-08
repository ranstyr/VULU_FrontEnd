import { ngMin }          from './ng-min';
import { ngMax }          from './ng-max';
import { toggleCurrency } from './toggle-currency';
import { siToggleVisible } from './toggle-visible';

export default angular.module('si.directives', [])
  .directive({
    ngMin,
    ngMax,
    toggleCurrency,
    siToggleVisible
  })