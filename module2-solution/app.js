(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.sellItems = ShoppingListCheckOffService.getSellItems();
  toBuy.boughtItem = function (index, itemName, itemQuantity) {
    ShoppingListCheckOffService.boughtItem(itemName, itemQuantity);
    toBuy.sellItems.splice(index, 1);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var sellItems = [
    {
      name: "Milk",
      quantity: "10"
    },
    {
      name: "Donuts",
      quantity: "20"
    },
    {
      name: "Cookies",
      quantity: "30"
    },
    {
      name: "Chocolate",
      quantity: "40"
    },
    {
      name: "Apples",
      quantity: "50"
    }
  ];

  // List of bought items
  var boughtItems = [];

  service.boughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getSellItems = function () {
    return sellItems;
  }
}

})();
