export class SignInManager {

  /* @ngInject */
  constructor(Auth, Modal, UserData) {
    this.Auth     = Auth;
    this.Modal    = Modal;
    this.UserData = UserData;
  }

  /**
   * Start login flow. Opens `Login` modal. When Login modal is closed or dismissed,
   * goes to either:
   *
   * 1. If user hasn't agreed to terms - goes to disclaimer
   * 2. If user has loggedin - does some postLogin actions and goes to dashboard
   * 3. If user doesn't have an account yet - goes to signup
   * 4. If user lost his password - goes to lostPassword
   */
  login() {
    this.Modal.open('Login')
      .then(user => {
          //TODO: Uncomment this after implementing disclaimer
          //  const agreedToTerms = !!user.AgreeToTerms;
          //  // Show disclaimer if a user still hasn't agreed to terms
          //  if (!agreedToTerms) {
          //    return this.disclaimer();
          //  }
          //  else {
          this.Auth.postLogin(user);
          this.redirectToDashboard();
          //}
        },
        // In cases modal was dismissed
        (reason = '') => {
          switch (reason) {
            case 'signup':
            {
              this.signup();
              break;
            }
            case 'lostPassword':
            {
              this.lostPassword();
              break;
            }
            case 'confirmCode':
            {
              this.confirmCode('Login');
              break;
            }
            default:
              break;
          }
        });
  }

  /**
   * Opens `Sign Up` modal. On modals' close (not dismiss), fetches user's data and redirects to disclaimer
   * if user has selected packages, or stays on Wizard if none were selected.
   */
  signup() {
    this.Modal.open('SignUp')
      .then(() => this.confirmCode('SignUp'));
  }

  /**
   * Opens `Disclaimer` modal. On Disclaimer close (not dismiss), goes to either:
   * Add Packages nodal (if user has selected packages);
   * Dashboard (if none above)
   *
   * On dismiss (user hasn't agreed to terms), logs user out and re-directs to wizard state.
   */
  disclaimer() {
    /*const showOnlyText = false;
     const actions      = {
     agreeToTerms: () => this.UserData.setUserAgreeToTerms()
     };

     const noChosenPackages  = _.isEmpty(this.WizardPackages.selectedPackages);
     const noAccountPackages = _.isEmpty(this.DashboardPackages.accountPackages.DashboardPackages);

     if (noChosenPackages && noAccountPackages) {
     return this.Launcher.open('Disclaimer', {showOnlyText, actions})
     .then(() => this.UserData.getUserData())
     .then(() => {
     if (this.Helper.isMobile()) {
     this.redirectToDashboard();
     }
     })
     .catch(() => {
     this.redirectToWizard();
     });
     }

     this.redirectToDashboard().then(() => {
     this.Launcher.open('Disclaimer', {showOnlyText, actions})
     .then(() => {
     this.UserData.getUserData().then(() => {
     if (!noChosenPackages) {
     return this.addPackages();
     }
     })
     }).catch(() => {
     this.redirectToLogout();
     })
     });*/
  }

  /**
   * Opens `Lost Password` modal.
   */
  lostPassword() {
    this.Modal.open('LostPassword')
      .then(() => this.confirmCode('LostPassword'));
  }

  confirmCode(opener) {
    const resolvedData = {
      email: this.UserData.getActiveUser().Email,
      opener: opener
    };
    this.Modal.open('ConfirmCode', {resolvedData: () => resolvedData})
      .then((user) => {
        if (opener === 'LostPassword') {
          this.resetPassword();
        }
        else {
          this.Auth.postLogin(user);
          this.redirectToDashboard();
        }

      });
  }

  resetPassword() {
    this.Modal.open('NewPassword', {email: ()=> this.UserData.getActiveUser().Email})
      .finally(() => this.login());
  }

  /**
   * If there's wizard selection and it's done (`strategy` key, which is the last
   * one in the flow, exists) then save them on server for user.
   *
   * Redirects to Dashboard state.
   */
  redirectToDashboard() {
    /*    if (this.$localStorage.wizardSelection && this.$localStorage.wizardSelection.strategy) {
     this.UserData.saveTradingPreferences(this.$localStorage.wizardSelection);
     }

     return this.$state.go('home.account.dashboard');*/
  }

  /**
   * Logs user out, re-directs to Wizard state.
   */
  redirectToWizard() {
    /*    this.Auth.logout();
     this.$state.go('home.wizard');*/
  }

  /**
   * Logs user out, re-directs to Wizard state.
   */
  redirectToLogout() {
    /*    this.Auth.logout();
     this.$state.go('home.logout');*/
  }

  updateTranslations() {
    /*    this.AppState.setPreLoginMode(false);

     // Flush cached translations
     this.$translate.refresh();

     return this.$translate.use(this.GroupTranslations.currentLanguage);*/
  }
}
