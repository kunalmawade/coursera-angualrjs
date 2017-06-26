(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/menu_app/templates/home.template.html'
    })

    // Premade list page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/menu_app/templates/categories.template.html',
      controller: 'CategoriesController as catCtrl'
    })

    // Menu Items
    .state('menuItems', {
      url: '/items?{short_name}',
      templateUrl: 'src/menu_app/templates/menuItems.template.html',
      controller: 'MenuItemsController as menuItemsCtrl',
      resolve: {
        menuList: [ '$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.short_name)
            .then(function(result) {
              return result.data.menu_items;
            });
        }]
      }
    });
  }
})();
