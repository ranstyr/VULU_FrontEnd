import { UserData }          from './user-data';
import { Portfolios }        from './portfolios';
import { ErrorCodes }        from './error-codes';
import { SearchModel }        from './searchModel.js';


export default angular.module('si.models', [])
    .service('UserData', UserData)
    .service('Portfolios', Portfolios)
    .service('ErrorCodes', ErrorCodes)
    .service('SearchModel', SearchModel)

