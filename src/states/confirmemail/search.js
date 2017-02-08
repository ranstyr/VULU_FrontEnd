export class SearchController {

  /* @ngInject */
  constructor($localStorage) {

    this.$localStorage  = $localStorage;




  }

  /**
   * Get updated portfolio on any question change
   * @returns {*}
   */
  getSearchResult() {

    const model = this.$localStorage.search;
    this.Search.get(model).then(Search_data => {
      this.Search_data = Search_data;
      return Search_data;
    });

  }

}
