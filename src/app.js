// Vendor libraries:
import 'expose?jQuery!expose?$!jquery/dist/jquery.min';
import 'expose?algoliasearch!expose?$!algoliasearch/dist/algoliasearch.angular.min';
import 'expose?autolinker!expose?$!autolinker/dist/autolinker.min';
import 'expose?ng-tags-input!expose?$!ng-tags-input/build/ng-tags-input.min';
import 'expose?angular-filter!expose?$!angular-filter/dist/angular-filter.min';
import 'expose?ng-text-truncate!expose?$!ng-text-truncate/ng-text-truncate';


//import 'npm-font-open-sans';

// Application assets:
import 'assets/scss/main.scss';

// Angular and 3rd party modules:
import angular                  from 'angular';
import ngAnimate                from 'angular-animate';
import momentJS                 from 'expose?moment!moment/moment';
import lodash                   from 'lodash';
import uiRouter                 from 'angular-ui-router';
import ngCurrency               from 'ng-currency';
import ngStorage                from 'ngStorage';
import ngTranslate              from 'angular-translate';
import ngSanitize               from 'angular-sanitize';
import ngFilter                 from 'angular-filter'


// Application modules:
import siCommon        from 'common/common.module';
import siModels        from 'models/models.module';
import siComponents    from 'components/components.module';
import siHome          from 'states/home.module';
import siManagers      from 'managers/managers.module';

let modules = [
    ngAnimate,
    uiRouter,
    ngCurrency,
    ngTranslate,
    ngStorage.name,
    siCommon.name,
    siModels.name,
    siManagers.name,
    siComponents.name,
    siHome.name,
    'algoliasearch',
    ngSanitize,
    'ngTagsInput',
    'angular.filter',
    'ngTextTruncate'
];

angular.module('startapp.db', modules);

// Bootstrap in strictDI mode
//todo ran fix strictDI isssue
angular.bootstrap(document, ['startapp.db'], {
    strictDi: false
});
