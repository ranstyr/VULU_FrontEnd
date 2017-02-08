export function ngMax() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: (scope, elem, attr, ctrl) => {
            
            scope.$watch(attr.ngMax, () => {
                ctrl.$setViewValue(ctrl.$viewValue);
            });
            
            let maxValidator = (value) => {
                
                var max = scope.$eval(attr.ngMax) || Infinity;
                
                if (!isEmpty(value) && parseFloat(value) > parseFloat(max)) {
                    ctrl.$setValidity('ngMax', false);
                    return value;
                } else {
                    ctrl.$setValidity('ngMax', true);
                    return value;
                }
                
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
};

function isEmpty(value) {
    return angular.isUndefined(value) || value === '' || value === null || value !== value;
}