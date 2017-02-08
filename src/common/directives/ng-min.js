export function ngMin() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, elem, attr, ctrl) => {
            
            scope.$watch(attr.ngMin, () => {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            
            let minValidator = (value) => {

                var min = scope.$eval(attr.ngMin) || 0;

                if (!isEmpty(value) && parseFloat(value) < parseFloat(min)) {
                    ctrl.$setValidity('ngMin', false);
                    return value;
                } else {
                    ctrl.$setValidity('ngMin', true);
                    return value;
                }

            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
};

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}