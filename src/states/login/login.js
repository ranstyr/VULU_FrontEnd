export class LoginController {

    /* @ngInject */
    constructor($localStorage, $scope, Auth, $state) {

        this.$localStorage = $localStorage;
        this.$scope = $scope;
        this.Auth = Auth;
        this.$state = $state;
		this.signupForm = true;
		this.warning = false;
		this.errorMessage = "";
    }


	
    login() {
        let credentials = {};
        credentials.email = this.$scope.email;
        credentials.password = this.$scope.password;
        this.Auth.login(credentials)
            .then((result)=> {
                //success
                // The signed-in user info.
                //this.Auth.setToken(result.refreshToken);
                //this.Auth.setUserId(result.uid);
                this.currentUser = this.Auth.getAuthData();
                this.$state.go('home.search');
            }, (reason)=> {
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
			this.errorMessage = reason.message;
				this.warning = false;		
                this.loginErrorMessage = {
                    "errorCode" : reason.code,
                    "errorMessage" : reason.message
                }
            });
    };

    signUp() {
        let credentials = {};
        credentials.email = this.$scope.email;
        credentials.password = this.$scope.password;
        this.Auth.signUp(credentials)
            .then((result)=>{
                //success
                // The signed-in user info.
                //this.Auth.setToken(result.refreshToken);
                //this.Auth.setUserId(result.uid);
                this.currentUser = this.Auth.getAuthData();
                this.$state.go('home.search');
            },(reason)=>{
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
			this.errorMessage = reason.message;
                this.warning = true;
                this.signUpErrorMessage = {
                    "errorCode" : reason.code,
                    "errorMessage" : reason.message
                }
            });
    };

    fbLogin(){
        this.Auth.fbLogin()
            .then((value)=>{
                //success
                //this.Auth.setToken(result.refreshToken);
                //this.Auth.setUserId(result.uid);
                this.currentUser = this.Auth.getAuthData();
                this.$state.go('home.search');
            }, (reason)=> {
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
			this.errorMessage = reason.message;
                this.warning = true;
                this.signUpErrorMessage = {
                    "errorCode" : reason.code,
                    "errorMessage" : reason.message
                }
            });

    }

    resetPassword(email) {
        this.Auth.resetPassword(this.$scope.email)
            .then((value)=> {
                //success
                this.currentUser = this.Auth.getAuthData();
                this.$state.go('home.login');
                //todo ran - raise modal
            }, (reason)=> {
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
			this.errorMessage = reason.message;
			 this.warning = true;
                this.resetPasswordErrorMessage = {
                    "errorCode" : reason.code,
                    "errorMessage" : reason.message
                }
            });
    }

	disableWarning(){
	this.warning = false;	
	}
	
	
}
