import LoginTemplate        from '../components/login/login.html';
import SignUpTemplate     from '../components/sign-up/sign-up.html'

export class ModalsFactory {

  /* @ngInject */
  constructor($modal) {
    this.$modal = $modal;

    this.currentOpenModal = null;
    this.defaultSettings  = {
      backdrop: 'static'
    };

    this.templatesRegistry = {
      'Login': LoginTemplate,
      'SignUp': SignUpTemplate
    };
  }

  /**
   * Calls for buildSettings method depending on the modal type and opens with generated settings
   *
   * @param {string} type The type of modal has to start with uppercase
   * @param {object} resolve Data to pass to modal's controller
   */
  showModal(type, resolve) {
    let newOpenModal      = this.$modal.open(this.buildSettings(type, resolve));
    this.currentOpenModal = newOpenModal;
    return newOpenModal;
  }

  /**
   * Generates settings based on type. Controller's name, controllerAs and template
   * have to start with uppercase like the type
   *
   * @param {string} type
   * @param {object} resolve Data to pass to modal's controller
   * @returns {*} Generated settings for given modal type: template, controller and controllerAs.
   */
  buildSettings(type, resolve) {
    let uniqueSettings = {
      resolve: resolve,
      template: this.templatesRegistry[type],
      controller: `${type}Controller`,
      controllerAs: type
    };

    return _.defaults(uniqueSettings, this.defaultSettings);
  }

  /**
   * Return current open modal
   */
  getCurrentOpenModal() {
    return this.currentOpenModal;
  }
}
