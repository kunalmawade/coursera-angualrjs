(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {
    var narrowIt = this;
    narrowIt.found = [];
    narrowIt.searching = false;
    narrowIt.searchTerm = "";
    narrowIt.downForMe = function () {
      narrowIt.searching = true;
      if (narrowIt.searchTerm === undefined || narrowIt.searchTerm.length === 0 || narrowIt.searchTerm.trim() === "") {
        narrowIt.found = [];
        narrowIt.searching = false;
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(narrowIt.searchTerm);
      promise.then(function(result){
        narrowIt.searching = false;
        narrowIt.found = result;
      });
    }

    narrowIt.removeItem = function (itemIndex) {
      narrowIt.found.splice(itemIndex, 1);
    };
  }

  function FoundItemsDirective () {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        menuItems: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'narrowItCtrl',
      bindToController: true
    }

    return ddo;
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(result) {
        return result.data.menu_items.filter(function(item){ return item.description.includes(searchTerm); });
      }, function(error) {
        return [];
      });
    };
  }

})();
