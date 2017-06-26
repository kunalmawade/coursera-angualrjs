(function () {
  'use strict';

  angular.module('MenuApp')
  .component('categoriesList', {
    templateUrl: 'src/menu_app/templates/categorieslist.template.html',
    bindings: {
      items: '<'
    }
  });
})();