angular.module('AutoComplete',[]).directive('autocomplete',function($http){
	return {
		restrict : 'E',
		replace : false,
		template : '<label for="autocomplete">'+options.labelText+'&nbsp;&nbsp;</label><input type="text" name="'+options.paramName+'" id="autocomplete" list="autoComplteList"/><datalist id="autoComplteList"><option value="{{opt.'+options.displayJSONAttribute+'}}" ng-repeat="opt in option" /></datalist><span class="loading" ng-bind="status"></span>',
		compile: function(tElem,attrs) {
			return function(scope,elem,attrs) {
				$http.get(options.dataPath).success(function(response){
					scope.option = response;
				}).error(function(response, status, headers, config){
					scope.status = status;
				});
		    };
		}
	}
});

