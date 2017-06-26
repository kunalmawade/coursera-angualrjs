(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['menuList'];

  function MenuItemsController(menuList) {
    var menuItemsCtrl = this;
    menuItemsCtrl.menuItems = menuList;
  }
}());