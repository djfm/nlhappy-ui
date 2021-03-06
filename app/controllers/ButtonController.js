nl.controller('ButtonController', function ($scope, $http) {

	$scope.show_more = false;

	var first = true;
	$scope.$watch('button', function() {
		if(first)
		{
			first = false;
		}
		else
		{
			$scope.updateButton();
		}
	}, true);

	if (!$scope.button.style)
	{
		$scope.button.style = '#83B817';
	}

	$scope.button.width = parseInt($scope.button.width);
	$scope.button.height = parseInt($scope.button.height);
	$scope.button.line_height = parseInt($scope.button.line_height);
	$scope.button.addons = $scope.button.addons == 1 ? true : false;

	$scope.deleteButton = function (pos_in_array, button) {
		$http.post(apiURL('/buttons/'+button.id+'/delete'))
		.success(function(data){
			if (data.success)
			{
				$scope.buttons.splice(pos_in_array, 1);
			}
		});
	};

	declareDelayedFunction($scope, 'updateButton', 1000, function () {
		$http.post(apiURL('/buttons/'+$scope.button.id), angular.toJson($scope.button));
	});

	$scope.moveButton = function (delta)
	{
		$http.post(apiURL('/buttons/'+$scope.button.id+'/move'), {delta: delta})
		.success(function (data){
			if(data.success)
			{
				for(var b in $scope.buttons)
				{
					var button = $scope.buttons[b];
					for(var i in data.data)
					{
						if(button.id == data.data[i].id)
						{
							button.position = data.data[i].position;
						}
					}
				}
			}
		});
	};

	$scope.moveButtonUp = function()
	{
		$scope.moveButton(-1);
	}

	$scope.moveButtonDown = function()
	{
		$scope.moveButton(1);
	}

	$scope.buttonOrderProp = function()
	{
		console.log("hi");
		return parseInt($scope.button.position);
	}

	$scope.showMore = function()
	{
		$scope.show_more = true;
	}

	$scope.showLess = function()
	{
		$scope.show_more = false;
	}
});