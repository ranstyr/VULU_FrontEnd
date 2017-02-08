import {auto }              from 'algoliasearch';
import db from './featureResult.json';




export class SearchController {

    /* @ngInject */
    constructor($localStorage, $scope, SearchModel, $location, $stateParams, $state , GLOBALS, $http, $timeout) {

        this.autolinker = window.autolinker;
        this.$localStorage = $localStorage;
        this.$scope = $scope;
        this.$location = $location;
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.closed = false;
        this.SearchModel = SearchModel;
		this.http = $http;
        this.searchresult = {};
        this.query = $location.search().query;
        this.queryId = this.$localStorage.queryId;
		this.currentUser = $localStorage.currentUser;
        this.isQuery = false;
        this.$timeout = $timeout;
		
        if (this.queryId){
            this.query = this.queryId;
            this.$localStorage.queryId = null;
        }

        this.GLOBALS = GLOBALS;
        this.groupName = GLOBALS.groupNameTheWeek;
        
		 this.getSearchResult(this.query);	
         
//        if (this.query) {
//            this.getSearchResult(this.query);	
//        }else{
//		this.getFeaturedResult();
//		}

        /*this.$scope.$watchCollection(
         () => this.searchresult,
         (newVal) => {
         if (!_.isEmpty(newVal)) {

         }
         }
         );*/

    }

    /**
     *
     * @returns {*}
     */
    getSearchResult(query) {
        this.isQuery = true;
        const model = query;
        this.$location.search({query: query});

        this.SearchModel.get(model).then(searchresult_data => {
            //searchresult_data = this.modifyResult(searchresult_data);
            this.searchresult = searchresult_data;
            this.$localStorage.searchresult = searchresult_data;


            return searchresult_data;
        });
    }
	
//	getFeaturedResult() {
//		this.http.get("../")
//         .then(searchresult_data => {
//         this.searchreslt = searchresult_data;
//         this.$localStorage.searchresult = 	searchresult_data;
//         return searchresult_data;
//         });
//
//    this.$timeout(() => {
//        this.searchresult = db ;
//        this.$localStorage.searchresult = 	this.searchresult;
//
//    },0)
//        this.isQuery = false;
//        this.searchresult = db ;
//        this.$localStorage.searchresult = 	this.searchresult;
//
//    }

    go2FS(hit) {
        this.$state.go('home.talkFS', {objectID: hit.objectID});
    }

    closing(){
		this.closed = true;
	}
	
    ngBindHtml(hit) {
        return hit._highlightResult.question.message.value;
    }

    modifyResult(searchresult_data) {
        searchresult_data.hits.forEach((element, index, array)=>{
            //if _highlighted result length is greater than X we will modify it and and leave only part of the
            if (element._highlightResult.question.message.value.length > 100){
                element._highlightResult.question.message.modifyValue = element._highlightResult.question.message.value;
                element._highlightResult.question.message.originalValue = element._highlightResult.question.message.value;

            }
        })
    }

}
