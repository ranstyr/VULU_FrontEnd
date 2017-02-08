import template from './loader.html';

class LoaderController {
  /* @ngInject */
  constructor(Loader) {
    this.Loader = Loader;
  }

  isLoading(){
    return this.Loader.loading !== 0
  }
}

export function siLoader() {
  return {
    restrict: 'E',
    template: template,
    scope: {},
    controller: LoaderController,
    controllerAs: 'Loader'
  };
}
