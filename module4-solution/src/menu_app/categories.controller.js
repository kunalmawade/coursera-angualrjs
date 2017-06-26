(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['catList']

  function CategoriesController(catList) {
    var catCtrl = this;
    catCtrl.allCategories = catList;
  }
}());
