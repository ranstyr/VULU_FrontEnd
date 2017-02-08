/**
 * This directive is used to toggle a target visibility state
 * It adds a click listener on the `document`
 * When clicked outside the target, it calls the provided toggle handler
 *
 * Interface
 * ===========
 *
 * `toggle-model` {boolean} - The model value to watch for changes
 * Defines if the target is currently visible or not
 *
 * `on-focus-lost` {Function} - A callback to call when clicked outside of target
 */

class ToggleVisibleController {

  /* @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout;

    this.validate();
  }

  validate() {
    if (!_.isBoolean(this.toggleModel)) {
      throw new TypeError('`toggle-model` must be a boolean property');
    }
  }
}

function linkFn(scope, element, attrs, ctrl) {
  const documentElm = angular.element(document);
  let isVisible     = false;

  // When the target is open, close it if clicked outside of it
  let documentClickHandler = evt => {
    let target = evt.target;

    // If already closed by some other trigger, do nothing
    if (!isVisible) {
      return;
    }

    if (element[0] !== target && !element[0].contains(evt.target)) {
      // Execute provided callback handler
      ctrl.onFocusLost();
      scope.$applyAsync();
    }
  };

  // Watch for the provided target model changes
  scope.$watch(
      () => ctrl.toggleModel,
      (newValue, oldValue) => {
        if (newValue === oldValue) {
          return;
        }

        // Used for preventing double handler action when the model changes from elsewhere
        isVisible = newValue;

        // Delay to avoid racing conditions
        ctrl.$timeout(() => {
          // If the target is visible, listen to clicks on the document
          if (newValue) {
            if (document.querySelector('.more')) {

              //Fix for japanese device, have to set styling manually otherwise doesn't look right
              setTimeout(() => {
                document.querySelector('.more').style.display = 'inline-block';
              });
            }

            return documentElm.on('click', documentClickHandler);
          }

          documentElm.off('click', documentClickHandler);
        });
      }
  );

  // Cleanup
  scope.$on('$destroy', () => {
    documentElm.off('click', documentClickHandler);
  });
}

export function siToggleVisible() {
  return {
    // Using Element to prevent an error with multiple isolated scopes
    restrict: 'E',
    scope: {},
    bindToController: {
      toggleModel: '=',
      onFocusLost: '&'
    },
    controller: ToggleVisibleController,
    controllerAs: 'ToggleVisible',
    link: linkFn
  };
}
