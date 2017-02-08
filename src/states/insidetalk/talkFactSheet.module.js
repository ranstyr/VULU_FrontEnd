import { TalkFSController } from './talkFactSheet.js';
import template       from './talkFactSheet.html';

/* @ngInject */
function fsRoutes($stateProvider) {
  $stateProvider
    .state('home.talkFS', {
      url: '/talkFS/:objectID',
      template: template,
      controller: 'TalkFSController',
      controllerAs: 'talkFS'
    });
}

export default angular.module('states.talkFS', [])
  .controller('TalkFSController', TalkFSController)
  .config(fsRoutes);

