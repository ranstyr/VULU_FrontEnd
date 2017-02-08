class ToggleCurrencyController {

    /* @ngInject */
    constructor($compile) {
        this.$compile = $compile;
    }
}

function link(scope, element, attrs, ctrl) {

    let onFocus = (evt ) => {
        element.attr( "ng-currency", "false" );
        ctrl.$compile(element)(scope);

    };

    let onBlur = (evt) => {
        element.attr( "ng-currency", "true" );
        ctrl.$compile(element)(scope);
    };

    element.off('focus').on('focus', onFocus);
    element.off('blur').on('blur', onBlur);
}

export function toggleCurrency() {
    return {
        restrict: 'A',
        controller: ToggleCurrencyController,
        link: link
    };
}