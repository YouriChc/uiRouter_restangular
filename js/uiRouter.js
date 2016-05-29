angular.module('cycleoflifeApp', ['ui.router', 'restangular'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/birth');

    $stateProvider
      .state('birth', {
        url: '/birth',
        template: '<div>Using FOAAS {{restController.version.message}}</div><div>You are borned<br><button ui-sref="birth.childhood">childhood</button><div ui-view></div></div>',
        controller: function($scope, Restangular){
          _.contains = _.includes;
          Restangular.setBaseUrl('http://foaas.com');
          $scope.version = Restangular.oneUrl('version').get();
        }
      })
      .state('birth.childhood', {
        url: '/childhood',
        template: '<div>You are grown up<br><button ui-sref="birth.childhood.study">study</button><br><button ui-sref="birth.childhood.career">career</button><div ui-view></div></div>'
      })
      .state('birth.childhood.study', {
        url: '/study',
        template: '<div>Really ?<br><button ui-sref=".phd">phd</button> <button ui-sref=".workinglife">workinglife</button><div ui-view></div></div>'
      })
      .state('birth.childhood.study.phd', {
        url: '/phd',
        template: '<div>Great, What next ?<br><button ui-sref=".workinglife">workinglife</button><div ui-view></div></div>'
      })
      .state('birth.childhood.career', {
        url: '/career',
        template: '<div>GoodLuck !<br><button ui-sref=".workinglife">workinglife</button><div ui-view></div></div>'
      });


    addWorkingLife($stateProvider, 'birth.childhood.study');
    addWorkingLife($stateProvider, 'birth.childhood.study.phd');
    addWorkingLife($stateProvider, 'birth.childhood.career');

    function addWorkingLife($stateProvider, parent){
      $stateProvider.state(`${parent}.workinglife`, {
        url: '/worklife',
        template: '<div>Good old days<br><button ui-sref=".pension">pension</button><div ui-view></div></div>'
      })
      .state(`${parent}.workinglife.pension`, {
        url: '/pension',
        template: '<div>Good old days<br><button ui-sref=".death">death</button><div ui-view></div></div>'
      })
      .state(`${parent}.workinglife.pension.death`, {
        url: '/death',
        template: '<div>RIP<br><button ui-sref="birth">birth</button></div>'
      });
    }
  });
