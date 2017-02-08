export class Loader {
  /* @ngInject */
  constructor($timeout) {
    this.loading  = 0;
    this.$timeout = $timeout;
  }

  showLoader() {
    this.loading += 1;
  }

  hideLoader() {
    // always delay by 1sec
    this.$timeout(()=> {
      if (this.loading > 0) {
        this.loading -= 1;
      }
    }, 1000)
  }
}
