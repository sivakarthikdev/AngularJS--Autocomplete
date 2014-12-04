angular.module('AutoComplete',[]).directive('autocomplete',function($http,$compile){
		return {
			restrict : 'E',
			//scope : {option : '@option'},
			replace : false,
			template : function(element, attr){
				var template = '<label for="autocomplete">'+attr.labeltext+'&nbsp;&nbsp;</label><input type="text" name="'+attr.paramname+'" id="autocomplete" list="autoComplteList'+attr.paramname+'"/><datalist id="autoComplteList'+attr.paramname+'"><option value="{{opt.'+attr.displayjsonattribute+'}}" ng-repeat="opt in option" /></datalist><span class="loading" ng-bind="status"></span>';
				return template;
			},
			compile: function(tElem,attrs) {
				return function(scope,elem,attrs) {
					$http.get(attrs.datapath).success(function(response){
						scope.option = response;
					}).error(function(response, status, headers, config){
						scope.status = status;
					});
				};
				tElem.replaceWith(template);
			}
		}
});

