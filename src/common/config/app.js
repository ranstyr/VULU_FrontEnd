export /* @ngInject */ function appConfig($compileProvider, $logProvider, $httpProvider, ENV,
                                          API_URLS) {

    if (!ENV.localhost) {
        $compileProvider.debugInfoEnabled(false);
        $logProvider.debugEnabled(false);
        $httpProvider.useApplyAsync(true);
        
        const parsedUrl = location.href.split('#')[0];
    }
}

export /* @ngInject */ function appRun($rootScope, ENV) {

    if (ENV.localhost) {
        $rootScope.$on('$stateChangeError', console.error.bind(console));
    }

}
