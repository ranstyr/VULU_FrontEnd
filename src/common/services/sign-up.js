export class Signup {

  /* @ngInject */
  constructor($q, Auth, Network, ErrorCodes, ORIGIN_TYPES) {
    this.$q = $q;

    this.Auth         = Auth;
    this.Network      = Network;
    this.ErrorCodes   = ErrorCodes.getErrorCodes();
    this.ORIGIN_TYPES = ORIGIN_TYPES;

    // Requests path
    this.path = 'Signup';
  }

  createNewUser(credentials) {
    const query = {
      'UserName': credentials.email,
      'PassWord': credentials.password,
      'Origin': this.ORIGIN_TYPES.web
    };

    return this.Network.put(this.path, query)
      .then(result => {
        if (!result.Succeeded) {
          return this.$q.reject(this.ErrorCodes[result.ErrorCode].TranslationKey);
        }
        else {
          return this.$q.resolve();
        }
      })
  }

  resendConfirmationCode(email) {
    const query = {
      'UserName': email
    };

    return this.Network.post(this.path, query)
      .then(result => {
        if (!result.Succeeded) {
          return this.$q.reject(this.ErrorCodes[result.ErrorCode].TranslationKey);
        }
        else {
          return this.$q.resolve();
        }
      })
  }

  completeSignup(email, code) {
    const query = {
      'UserName': email,
      'ConfirmationCode': code,
      'Origin': this.ORIGIN_TYPES.web
    };

    return this.Network.post(this.path, query)
      .then(result => {
        if (!result.Succeeded) {
          return this.$q.reject(this.ErrorCodes[result.ErrorCode].TranslationKey);
        }
        else {
          this.Auth.setToken(result.Response);
          this.Auth.setBrokerUrl();
          //TODO: Remove the return and uncomment the other one after userData is integrated with BE
          return this.$q.resolve();
          //return this.$q.resolve(this.UserData.getUserData());
        }
      })
  }
}
