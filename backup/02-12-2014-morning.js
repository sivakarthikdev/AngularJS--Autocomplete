angular.module('AutoComplete',[]).directive('autocomplete',function($http){
	var autoCompleteSelector = angular.element(document.querySelector('autocomplete'));
	return {
		restrict : 'E',
		replace : false,
		template : '<label for="autocomplete">'+autoCompleteSelector.attr('data-labelText')+'&nbsp;&nbsp;</label><input type="text" name="'+autoCompleteSelector.attr('data-paramName')+'" id="autocomplete" list="autoComplteList"/><datalist id="autoComplteList"><option value="{{opt.'+autoCompleteSelector.attr('data-displayJSONAttribute')+'}}" ng-repeat="opt in option" /></datalist><span class="loading" ng-bind="status"></span>',
		compile: function(tElem,attrs) {
			return function(scope,elem,attrs) {
				$http.get(autoCompleteSelector.attr('data-dataPath')).success(function(response){
					scope.option = response;
				}).error(function(response, status, headers, config){
					scope.status = status;
				});
		    };
		}
	}
});

