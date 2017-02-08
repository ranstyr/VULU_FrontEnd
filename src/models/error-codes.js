export class ErrorCodes {

  /* @ngInject */
  constructor(Network) {
    this.Network = Network;

    // Set defaults
    this.errorCodes = {};
  }

  initErrorCodes() {
   /* return this.Network.get('ErrorCodes')
      .then(result => {
        if (result.Succeeded) {
          // Reset `errorCodes` and fill with the new data
          angular.copy(result.Response, this.errorCodes);
        }
      });*/
  }

  getErrorCodes() {
  /*  if (_.isEmpty(this.errorCodes)) {
      this.initErrorCodes();
    }
    return this.errorCodes;*/
  }
}
