import { HomeController } from './home';
import homeTemplate       from './home.html';
import login              from './login/login.module';
import search             from './search/search.module.js';
import talkFactSheet      from './insidetalk/talkFactSheet.module.js';
import firebase           from 'firebase';


/* @ngInject */
function appRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            abstract: true,
            template: homeTemplate,
            controller: 'HomeController',
            controllerAs: 'Home'
        });

    $urlRouterProvider.otherwise('/search');
}

function initFireBase() {
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyBY3B7t2ZotFCAyUqWmlqNu2h8TqZlBKW4",
        authDomain: "vulu-9ba13.firebaseapp.com",
        databaseURL: "https://vulu-9ba13.firebaseio.com",
        storageBucket: "vulu-9ba13.appspot.com",
        messagingSenderId: "398780956565"
    };
    firebase.initializeApp(config);
}

export default angular.module('stratupDB.app', [
    login.name,
    search.name,
    talkFactSheet.name
])
    .controller({HomeController})
    .config(appRoutes)
    .config(initFireBase)
