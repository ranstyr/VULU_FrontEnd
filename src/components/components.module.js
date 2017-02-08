import {header}             from './header/header';


import modals from './modals/modals.module';
import loader from './loader/loader.module';

export default angular.module('si.components', [
    modals.name,
    loader.name
  ])
  .directive({
    header
  });