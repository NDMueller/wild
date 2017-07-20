'use strict';

angular.module('bakerApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home.html'
  }).state('recipes', {
    url: '/recipes',
    controller: "getRecipeCtrl",
    templateUrl: './views/recipes.html'
  }).state('about', {
    url: '/about',
    templateUrl: './views/about.html'
  }).state('recipeForm', {
    url: '/recipes/submit',
    controller: "formCtrl",
    templateUrl: './views/forms.html'

  }).state('gallery', {
    url: '/gallery',
    templateUrl: './views/gallery.html'
  });

  $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('bakerApp').controller('formCtrl', ["$scope", "formSrv", function ($scope, formSrv) {
  console.log('GOT HERE!');

  $scope.test = "Hi Lloyd";
  $scope.hideModal = function () {
    $scope.show = false;
  };
  $scope.postRecipe = function (title, instructions, description, ingredients) {
    console.log(title, instructions, description, ingredients);
    formSrv.postRecipe(title, instructions, description, ingredients).then(function (response) {
      // console.log(response);
      $scope.show = true;
      setTimeout(function () {
        $scope.show = false;
      }, 5000);
    });
  };
}]);
'use strict';

angular.module('bakerApp').controller('getRecipeCtrl', function ($scope, getRecipeSrv) {

  $scope.getRecipePlease = function () {
    getRecipeSrv.getRecipePlease().then(function (response) {
      console.log(response.data);
      $scope.recipes = response.data;
    });
  };
  $scope.getRecipePlease();
});
'use strict';

angular.module('bakerApp').directive('footerDir', function () {
  return {
    restrict: 'E',
    templateUrl: './views/footerDir.html'
  };
});
'use strict';

angular.module('bakerApp').directive('galleryDir', function () {
  return {
    restrict: 'E',
    templateUrl: './views/galleryDirTemp.html'
  };
});
'use strict';

angular.module('bakerApp').directive('navDir', function () {
  return {
    restrict: 'E',
    templateUrl: './views/navDirTemp.html'
  };
});
'use strict';

angular.module('bakerApp').service('formSrv', ["$http", function ($http) {
  this.postRecipe = function (titleIn, instructionsIn, descriptionIn, ingredientsIn) {
    console.log('got here,got code');
    return $http({
      method: "POST",
      url: "/recipes/submit",
      data: {
        title: titleIn,
        instructions: instructionsIn,
        description: descriptionIn,
        ingredients: ingredientsIn
      }
    });
  };
}]);
'use strict';

angular.module('bakerApp').service('getRecipeSrv', ["$http", function ($http) {

  this.getRecipePlease = function () {
    return $http({
      method: 'GET',
      url: '/recipes'
    });
  };
}]);