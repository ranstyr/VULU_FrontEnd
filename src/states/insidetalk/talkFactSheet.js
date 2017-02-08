
export class TalkFSController {

    /* @ngInject */
    constructor($localStorage, $scope, SearchModel, $location, $stateParams, $state ,GLOBALS) {


        this.autolinker = window.autolinker;
        this.$localStorage = $localStorage;
        this.$scope = $scope;
        this.$state = $state;
        this.SearchModel = SearchModel;
        this.$stateParams = $stateParams;
        this.currentUser = $localStorage.currentUser;
        this.objectID = this.$stateParams.objectID;
        this.fsResult = {};
        this.FBGroupUrl = '';
        this.GLOBALS = GLOBALS;
        this.groupName = GLOBALS.groupNameTheWeek;
        this.randNum = this.getPicId();


        //this.bgImage = require('../../assets/images/rand-images/' + this.randNum + '.jpg');
        //this.myStyle = {'background-image': {'linear-gradient' : '(to bottom, rgba(0, 0, 0, .75), rgba(0, 0, 0, .9))' , 'src' : this.bgImage }};

        this.SearchModel.getById(this.objectID).
        then((searchFsresult_data)=>{
                this.fsResult = searchFsresult_data;

                this.$localStorage.fsResult = searchFsresult_data;
                console.log(searchFsresult_data);
                this.FBGroupUrl = 'https://www.facebook.com/'  + searchFsresult_data.id;
                return searchFsresult_data;
            },(err)=>{
                console.log(err);
            });
    }

	
	
    getPicId(){
        //return picture id randomly
		var id = Math.floor(Math.random() * 29) + 1;
		this.randNum = id;
        return id;
    }





}

