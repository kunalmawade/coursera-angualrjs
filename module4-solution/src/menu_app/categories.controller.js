(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['MenuDataService']

  function CategoriesController(MenuDataService) {
    var catCtrl = this;
    catCtrl.allCategories = [];

    catCtrl.$onInit = function () {
      MenuDataService.getAllCategories()
      .then(function (result) {
        catCtrl.allCategories = result.data;
      });
    };
  }
}());