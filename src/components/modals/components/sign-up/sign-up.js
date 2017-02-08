export class SignUpController {

  /* @ngInject */
  constructor($modalInstance, Signup, PATTERNS) {
    this.$modalInstance = $modalInstance;

    this.Signup   = Signup;
    this.PATTERNS = PATTERNS;

    // Inputs' div parent changes it's class based on these properties
    this.inputsValidity = {
      email: true,
      password: true
    };

    // Properties we send on login request
    this.credentials = {
      email: null,
      password: null
    };

    this.authError         = null;
    this.passwordInputType = 'password';
  }

  revealPassword() {
    this.passwordInputType = 'text';
  }

  hidePassword() {
    this.passwordInputType = 'password';
  }

  closeModal(data) {
    this.$modalInstance.close(data);
  }

  dismissModal(reason) {
    this.$modalInstance.dismiss(reason);
  }

  lostPasswordHandler() {
    this.dismissModal('lostPassword');
  }

  openSignup() {
    this.dismissModal('signup');
  }

  /**
   * Check email validity on blur, change validity only if email isn't empty (email.$viewValue)
   */
  checkEmailValidity() {
    let email = this.signUpForm.email;

    if (email.$viewValue) {
      this.inputsValidity.email = email.$valid;
    }
  }

  /**
   * Check password validity on blur, change validity only if password isn't empty (password.$viewValue)
   */
  checkPasswordValidity() {
    let password = this.signUpForm.password;

    if (password.$viewValue) {
      this.inputsValidity.password = password.$valid;
    }
  }

  /**
   * Make input valid on focus
   */
  inputInFocus(inputType) {
    this.inputsValidity[inputType] = true;
  }

  showError(status) {
    this.authError = status;
  }

  hideError() {
    this.authError = null;
  }

  /**
   * signup only if form is valid
   */
  signUp() {
    if (this.signUpForm.$invalid) {
      this.inputsValidity = {
        email: this.signUpForm.email.$valid,
        password: this.signUpForm.password.$valid
      };
      return this.inputsValidity;
    }

    this.hideError();
    this.Signup.createNewUser(this.credentials)
      .then(() => this.closeModal())
      .catch(error => {
        this.showError(error);
        //this.Idle.unwatch();
      });
  }
}
