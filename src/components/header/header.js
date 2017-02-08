import template from './header.html';

class HeaderController {

    /* @ngInject */
    constructor($localStorage, $scope, Auth, $state, SearchModel, $location, algolia, $timeout) {
        this.$localStorage = $localStorage;
        this.$scope = $scope;
        this.Auth = Auth;
        this.$state = $state;
        this.SearchModel = SearchModel;
        this.$location = $location;
        this.fullscreenSearch = false;
        this.algolia = algolia;
        this.$timeout = $timeout;
        this.currentUser = $localStorage.currentUser;
        this.tags = this.updateTags($location.search().query);
		this.warning = false;
		this.errorMessage = "";

        this.$scope.$watchCollection(
            () => this.tags,
            (newVal) => {
                this.updateTags(newVal);
            }
        );

    }

    updateTags(newVal) {
        if (!_.isEmpty(newVal)) {
            if (typeof newVal !== 'object') {
                var arr = newVal.match(/[^\s-]+-?/g);
                arr.forEach((ele, index, array)=> {
                    arr[index] = {
                        "text": ele
                    }
                })
                newVal = arr;
            }
            var searchSTR = "";
            newVal.forEach((ele, index, array)=> {
                searchSTR += ele.text;
                if (array.length - 1 != index) {
                    searchSTR += ' ';
                }
            })
        }
        if (searchSTR) {
            this.query = searchSTR;
            this.search();
        }
    }

    search() {
        if (this.$location.url().contains("talkFS")) {
            this.$localStorage.queryId = this.query;
            this.$state.go('home.search');
        } else {
            this.$timeout(()=> {
                this.$location.search({query: this.query});
                this.onSearch({query: this.query});

            }, 0);
        }

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

            }, (reason)=> {
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
			this.errorMessage = reason.message;
				this.warning = true;		
            });
    }

	disableWarning(){
	this.warning = false;	
	}

    logout() {
        let credentials = {};
        credentials.email = this.$scope.email;
        credentials.password = this.$scope.password;
        this.Auth.logout(this.currentUser)
            .then((result)=> {
                //success
                // The signed-in user info.
                //this.Auth.setToken(result.refreshToken);
                this.currentUser = this.Auth.getAuthData();

            }, (reason)=> {
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
				
            });
    }


;

    closeFullScreen() {
        this.fullscreenSearch = false;
    }

    signUp() {
        let credentials = {};
        credentials.email = this.$scope.email;
        credentials.password = this.$scope.password;
        this.Auth.signUp(credentials)
            .then((result)=> {
                //success
                // The signed-in user info.
                //this.Auth.setToken(result.refreshToken);
                //this.Auth.setUserId(result.uid);
                this.currentUser = Auth.getAuthData();

            }, (reason)=> {
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
				this.errorMessage = reason.message;
				this.warning = false;		
            });
    }

;

    fbLogin() {
        this.Auth.fbLogin()
            .then((value)=> {
                //success
                //this.Auth.setToken(result.refreshToken);
                //this.Auth.setUserId(result.uid);
                this.currentUser = this.Auth.getAuthData();
            }, (reason)=> {
                console.log("auto error : errorCode " + reason.code + "errorMessage: " + reason.message);
				this.errorMessage = reason.message;
				this.warning = false;		
            });

    }

    resetPassword(email) {
        this.Auth.resetPassword(this.$scope.email)
            .then((value)=> {
                //success
                //todo ran - raise modal
            }, (reason)=> {
                console.log("resetPassword : errorCode " + reason.code + "errorMessage: " + reason.message);
			this.errorMessage = reason.message;
				this.warning = false;		
            });
    }

    /**
     * Check if user is already logged in based on the authData
     */
    isLoggedIn() {
        return this.Auth.getAuthData();
    }

    /**
     * Create a list of all languages supported and defined by the broker (from attribute)
     */
    getLanguagesList() {
        //TODO: Remove this hard coded after product adds attribute
        //let langList = this.GroupAttributes.getLangList();
        let langList = {
            "en-US": {code: "en-US", displayname: "lblEnglish"},
            "ja-JP": {code: "ja-JP", displayname: "lblJapanese"},
            "zh-CN": {code: "zh-CN", displayname: " lblChineseCN"},
            "ru-RU": {code: "ru-RU", displayname: "lblRussian"},
            "zh-CHT": {code: "zh-CHT", displayname: " lblChineseCHT"}
        };

        // Parse data for the Dropdown component
        return _.map(langList, lang => {
            return {
                text: this.$translate.instant(lang.displayname),
                iconClass: lang.code
            };
        });
    }

    /**
     * On Languages dropdown selection
     *
     * @param  {Object} selection Option object (text, iconClass)
     */
    languageChange(selection) {
        this.languagesDropdown.mainIconClass = selection.iconClass;

        //this.GroupTranslations.setCurrentLanguage(selection.iconClass);

        // Fetch translations for the selected language
        //this.$translate.use(this.GroupTranslations.getCurrentLanguage());
        this.$translate.use('en-US');
    }
}


export function header() {
    return {
        restrict: 'E',
        template: template,
        replace: true,
        scope: {},
        bindToController: {
            onSearch: '&',
            query: '='
        },
        controller: HeaderController,
        controllerAs: 'Header',
        link: (scope, elem, attr, ctrl) => {
            angular.element(document.querySelector('#search-input')).on('keypress', (e)=> {
                //ctrl.search();
            });
        }

    }
}
