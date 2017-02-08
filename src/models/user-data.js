export class UserData {

  /* @ngInject */
  constructor($sessionStorage, $localStorage, Network) {

    this.$sessionStorage = $sessionStorage;
    this.$localStorage   = $localStorage;
    this.Network         = Network;

    // Paths
    this.userDataPath            = 'UserData/GetUserData';
    this.disclaimerPath          = 'UserData/SetUserAgreeToTerms';
    this.userSettingsPath        = 'UserData/GetUserSettings';
    this.getTradingPrefPath      = 'UserData/GetTradingPreferences';
    this.saveTradingPrefPath     = 'UserData/SaveTradingPreferences';
    this.updateUserSettingsPath  = 'UserData/UpdateUserSettings';
    this.updateExecutionModePath = 'UserData/UpdateExecutionMode';

    this.activeUser = {};
  }

  getUserData() {
    return this.Network.post(this.userDataPath, {'LiveDemo': 0})
      // Update the user Model, preserve data binding
      .then(userData => {

        // Reset `activeUser` and fill with the new data
        angular.copy(userData, this.activeUser);

        return this.activeUser;
      });
  }

  getActiveUser() {
    // TODO: Remove this hard coded after integration with BE
    //return _.isEmpty(this.activeUser) ? null : this.activeUser;
    return {Email: 'ran.styr@gmail.com'};
  }

  getUserSettings() {
    return this.Network.post(this.userSettingsPath, {});
  }

  updateUserSettings(settings) {
    return this.Network.post(this.updateUserSettingsPath, settings);
  }

  setUserAgreeToTerms() {
    return this.Network.post(this.disclaimerPath, {
      User_ID: this.$sessionStorage.authData.UserID
    });
  }

  /**
   * Update the account execution mode
   *
   * @param {number}  mode          Execution mode
   *   1 - Automatic
   *   2 - Require confirmation
   *   3 - On hold
   * @param {boolean} approveOrDeny `true` approves all pending positions, `false` denies all
   */
  updateExecutionMode(mode, approveOrDeny = false) {
    const accountId = this.getActiveUser().Accounts[0].AccountID;

    const query = {
      AccountID: accountId,
      ExecutionModeID: mode,
      ApproveOrDeny: approveOrDeny
    };

    return this.Network.post(this.updateExecutionModePath, query);
  }

  /**
   * Saves user's wizard selection (preferences)
   *
   * @param {object} preferences Wizard selection
   */
  saveTradingPreferences(preferences) {
    const timeFrame = preferences.timeFrameID;
    const query = {
      StartingBalance: preferences.balance,
      RiskFactor: preferences.strategy,
      GainLossFactor: preferences.motivation,
      TimeFrameID: timeFrame
    };

    return this.Network.post(this.saveTradingPrefPath, query);
  }

  /**
   * Loads user's saved preferences
   */
  getTradingPreferences() {
    return this.Network.post(this.getTradingPrefPath);
  }

}
