var config = {
  host: window.location.hostname,
  prefix: "/",
  port: window.location.port,
  isSecure: window.location.protocol === "https:"
};

require.config({
  baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
  paths: {
    bootstrap: bootstrapPath,
    scoreApp: appPath,
    ngRoute: ngRoutePath,
    ngAnimate: ngAnimatePath,
    ngTouch: ngTouchPath,
    
    homeCtrl: ctrlPath + 'home',
    headerCtrl: ctrlPath + 'header',
    filtersCtrl: ctrlPath + 'filters',
    searchBarCtrl: ctrlPath + 'searchBar',
    launchExecutionCtrl: ctrlPath + 'launchExecution',
    inMarketPerformanceCtrl: ctrlPath + 'inMarketPerformance',
    operationalExecutionCtrl: ctrlPath + 'operationalExecution',
    teamEngagementCtrl: ctrlPath + 'teamEngagement',

    singleKPICtrl: ctrlPath + 'singleKPI'
  }
});

require(["js/qlik"], function (qlik) {
  require(["angular", "scoreApp", "bootstrap"], function (angular) {
    angular.bootstrap(document, ["scoreModule", "qlik-angular"]);
  });
});