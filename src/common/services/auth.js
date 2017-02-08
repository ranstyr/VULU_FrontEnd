import firebase from 'firebase';
export class Auth {

    /* @ngInject */
    constructor($q, $translate, $sessionStorage, Network, $localStorage) {
        this.$q = $q;
        this.$translate = $translate;
        this.$sessionStorage = $sessionStorage;
        this.$localStorage = $localStorage;
        this.Network = Network;
        this.auth = firebase.auth();
        this.provider = new firebase.auth.FacebookAuthProvider();

    }

    login(credentials) {
        let deferred = this.$q.defer();
        const userCredentials = {
            'UserName': credentials.email,
            'PassWord': credentials.password,
        };

        this.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((value)=> {
                //success
                var currentUser = {
                    "imageUrl": value.photoURL,
                    "email": value.email,
                    "displayName": value.displayName,
                    "providerData": value.providerData[0],
                    "token": value.uid,
                    "refreshToken": value.refreshToken
                };

                this.setUser(currentUser);
                deferred.resolve(value);
            }, (reason)=> {
                let failureMessage = {
                    code: reason.code,
                    message: reason.message
                };
                deferred.reject(failureMessage);

            });

        return deferred.promise;

    }

    fbLogin() {

        let deferred = this.$q.defer();


// You can add additional scopes to the provider:
        this.provider.addScope('email');
        this.provider.addScope('user_friends');

// Sign in with popup:
        this.auth.signInWithPopup(this.provider).then((result)=> {
            // The firebase.User instance:
            var user = result.user;
            // The Facebook firebase.auth.AuthCredential containing the Facebook
            // access token:
            var credential = result.credential;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            var credential = result.credential;
            var currentUser = {
                "imageUrl": result.user.photoURL,
                "email": result.user.email,
                "displayName": result.user.displayName,
                "credential": credential,
                "token": credential.accessToken
            };
            this.setUser(currentUser);
            deferred.resolve(result);

        }, (reason) =>{
            // The provider's account email, can be used in case of
            // auth/account-exists-with-different-credential to fetch the providers
            // linked to the email:
            var email = reason.email;
            // The provider's credential:
            var credential = reason.credential;
            // In case of auth/account-exists-with-different-credential error,
            // you can fetch the providers using this:
            if (reason.code === 'auth/account-exists-with-different-credential') {
                this.auth.fetchProvidersForEmail(email).then(function(providers) {
                    // The returned 'providers' is a list of the available providers
                    // linked to the email address. Please refer to the guide for a more
                    // complete explanation on how to recover from this error.
                    let failureMessage = {
                        code: 5555,
                        message: "Already register via mail please login using your mail adress"
                    };
                    deferred.reject(failureMessage);
                });
            }

            let failureMessage = {
                code: reason.code,
                message: reason.message
            };
            deferred.reject(failureMessage);
        });

        return deferred.promise;

    }

       /* var provider = new firebase.auth.FacebookAuthProvider();
        let deferred = this.$q.defer();


        firebase.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            var credential = result.credential;
            var currentUser = {
                "imageUrl": result.user.photoURL,
                "email": result.user.email,
                "displayName": result.user.displayName,
                "credential": credential,
                "token": credential.accessToken
            };
            this.setUser(currentUser);
            deferred.resolve(result);

        }, (reason)=> {
            let failureMessage = {
                code: reason.code,
                message: reason.message
            };
            deferred.reject(failureMessage);

        });
        return deferred.promise;

    }*/

    /*
     fbLogin() {
     let deferred = this.$q.defer();

     // First, we perform the signInWithRedirect.
     // Creates the provider object.
     var provider = new firebase.auth.FacebookAuthProvider();
     // You can add additional scopes to the provider:
     provider.addScope('email');
     provider.addScope('user_friends');
     // Sign in with redirect:
     this.auth.signInWithRedirect(provider);
     ////////////////////////////////////////////////////////////
     // The user is redirected to the provider's sign in flow...
     ////////////////////////////////////////////////////////////
     // Then redirected back to the app, where we check the redirect result:
     this.auth.getRedirectResult().then((result) => {
     // The firebase.User instance:
     var user = result.user;
     // The Facebook firebase.auth.AuthCredential containing the Facebook
     // access token:
     var credential = result.credential;
     var currentUser = {
     "imageUrl" : result.user.photoURL,
     "email" : result.user.email,
     "displayName" :result.user.displayName,
     "credential" : credential,
     "token" : credential.accessToken
     };

     this.setUser(currentUser);
     deferred.resolve(result);
     },  (error)=> {
     // The provider's account email, can be used in case of
     // auth/account-exists-with-different-credential to fetch the providers
     // linked to the email:
     var email = error.email;
     // The provider's credential:
     var credential = error.credential;
     // In case of auth/account-exists-with-different-credential error,
     // you can fetch the providers using this:
     if (error.code === 'auth/account-exists-with-different-credential') {
     this.auth.fetchProvidersForEmail(email).then(function (providers) {
     // The returned 'providers' is a list of the available providers
     // linked to the email address. Please refer to the guide for a more
     // complete explanation on how to recover from this error.
     });
     }
     let failureMessage = "auto error : errorCode " + error.code + "errorMessage: " + error.message;
     deferred.reject(failureMessage);

     });

     return deferred.promise;
     }
     */

    signUp(credentials) {
        let deferred = this.$q.defer();
        const userCredentials = {
            'UserName': credentials.email,
            'PassWord': credentials.password,
        };

        this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then((value)=> {
                //success
                var currentUser = {
                    "imageUrl": value.photoURL,
                    "email": value.email,
                    "displayName": value.displayName,
                    "providerData": value.providerData[0],
                    "token": value.uid,
                    "refreshToken": value.refreshToken
                };

                this.setUser(currentUser);
                deferred.resolve(value);
            }, (reason)=> {
                let failureMessage = {
                    code: reason.code,
                    message: reason.message
                };
                deferred.reject(failureMessage);

            });

        return deferred.promise;


    }

    resetPassword(email) {
        let deferred = this.$q.defer();

        this.auth.sendPasswordResetEmail(email)
            .then((value)=> {
                //success
                deferred.resolve(value);
            }, (reason)=> {
                let failureMessage = {
                    code: reason.code,
                    message: reason.message
                };
                deferred.reject(failureMessage);

            });

        return deferred.promise;

    }

    /**
     *
     * @returns {*}
     */
    getSearchResult() {
        let searchResult = this.Search.getSearchResult(this.$scope.query)
        console.log("searchResult" + searchResult);
        //const model = this.$localStorage.search;
        /*    this.Search.get(model).then(Search_data => {
         this.Search_data = Search_data;
         return Search_data;
         });
         */
    }

    getToken() {
        return this.$localStorage.authData && this.$localStorage.authData.Token;
    }

    setToken(token) {
        this.$localStorage.authData = this.$localStorage.authData || {};
        this.$localStorage.authData.Token = token;
    }

    setUser(currentUser) {
        this.$localStorage.currentUser = currentUser || {};
        this._authData = currentUser;
    }

    getAuthData() {
        return this._authData;
    }

    deleteLocalStorage() {
        delete this.$localStorage.authData;
    }

    mapHebrewMessage(key) {
        let map = {
            "auth/email-already-in-use": "כתובת הדוא״ל כבר נמצאת בשימוש ע״י חשבון אחר",
            "auth/user-not-found": "אין משתמש עם דוא״ל זהה,ייתכן והרשומה נמחקה",
            "auth/account-exists-with-different-credential" : "קיים חשבון עם אותה דוא״ל אבל עם אישורי כניסה שונים,היכנס באמצעות חשבון משוייך לכתובת דוא״ל זו"
        };

        if (map[key]) {
            return map[key];
        }
        else {
            return null;
        }
    }

    logout(currentUser){
        let deferred = this.$q.defer();

        this.auth.signOut().then((value)=>{
            this.$localStorage.currentUser =  null;
            this._authData = null;
            debugger;
            deferred.resolve(value);
        },(error)=>{
            deffer.reject(error);
        })
        return deferred.promise;


    }


}
