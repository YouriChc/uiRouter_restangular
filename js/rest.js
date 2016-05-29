angular.module('cycleoflifeApp')
  .controller('restController', function($scope, Restangular) {

    _.contains = _.includes;
    Restangular.setBaseUrl('http://foaas.com');

    var version = $scope.version = Restangular.oneUrl('version').get();
});
