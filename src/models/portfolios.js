//var portfolio_json             = require('../../data/portfolioData.json');

export class Portfolios {

  /* @ngInject */
  constructor(Network) {
    this.Network = Network;

    // Paths
    this.portfoliosCompositionPath = 'Portfolio/Composition';
    this.portfoliosPath = 'Portfolio';

    // this.packagesPerformance = 'WizardPackages/GetWizardPackagesPerformance';
    // this.extendedPackagesPath = 'WizardPackageInfo/GetPackageExInfo';

    this.portfolios = {};
  }

  // RegisterToken(packageQuery) {
  //     return this.Network.post(this.packagesPath, packageQuery)
  //         .then(wizardPackages => {
  //             this.ColorService.addUnusedColorToPackages(wizardPackages.WizardPackages);
  //
  //             angular.copy(wizardPackages, this.packages);
  //
  //             return wizardPackages;
  //         });
  // }

  get(query) {
    return this.Network.get(this.portfoliosCompositionPath, query)
      .then(portfolios => {
        const portfolios_data = portfolio_json.portfolioData
        angular.copy(portfolios_data, this.portfolios);
        return portfolios_data;
       // return portfolios;
      });
  }

}
