(function () {
	'use strict';

	angular.module('lunchChecker', [])
	
	.controller('LunchCheckController', ['$scope', function($scope){
		$scope.checkIfTooMuch = function () {
			$scope.warning = false;
			$scope.enjoy = false;
			if ($scope.lunchMenu == undefined || $scope.lunchMenu === "") {
				$scope.message = "Please enter data first";
			} else {
				var lunchItems = $scope.lunchMenu.split(",");
				var emptyItems = 0;
				lunchItems.forEach(function(item){
					if (item.trim() === "")
						emptyItems++;
				});
				
				if (emptyItems > 0) {
					$scope.warning = true;
				}
				
				if (lunchItems.length - emptyItems === 0) {
					$scope.message = "Please enter data first";
				} else if (lunchItems.length - emptyItems <= 3) {
					$scope.message = "Enjoy!";
					$scope.enjoy = true;
				} else {
					$scope.message = "Too much!";
					$scope.enjoy = true;
				}
			}
		};
	}]);
})();