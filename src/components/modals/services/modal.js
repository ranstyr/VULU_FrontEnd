export class Modal {

  /* @ngInject */
  constructor(ModalsFactory) {
    this.ModalsFactory = ModalsFactory;
  }

  /**
   * Opens modal using ModalsFactory
   *
   * @param type    Type of modal, has to start with uppercase (e.g: 'Login')
   * @param resolve Data we pass to the modal
   * @param returnInstance return the instance
   */
  open(type, resolve, returnInstance) {
    if (!returnInstance) {
      return this.ModalsFactory.showModal(type, resolve)
        .result
        .then(data => data);
    }
    else {
      return this.ModalsFactory.showModal(type, resolve)
    }
  }

  /**
   * Return current open modal
   */
  getCurrentOpenModal() {
    return this.ModalsFactory.getCurrentOpenModal();
  }
}