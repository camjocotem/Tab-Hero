(function (angular) {
    "use strict";
    var pfccApp = angular.module('app');

    var loggedInCheck = function (accountService) {
        if (accountService.isLoggedIn()) {
            return true;
        }

        return false;
    };

    pfccApp.config(['$urlRouterProvider', function ($urlRouterProvider) {
        // Here's an example of how you might allow case insensitive urls
        // Note that this is an example, and you may also use
        // $urlMatcherFactory.caseInsensitive(true); for a similar result.
        $urlRouterProvider.rule(function ($injector, $location) {
            //what this function returns will be set as the $location.url
            var path = $location.path(),
                normalized = path.toLowerCase();
            if (path !== normalized) {
                //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
                $location.replace().path(normalized);
            }
            // because we've returned nothing, no state change occurs
        });
    }]);

    pfccApp.config(['$stateProvider', '$urlMatcherFactoryProvider', function ($stateProvider, $urlMatcherFactoryProvider) {

        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider.state('default', {
            url: "/",
            views: {
                'primary': {
                    templateUrl: 'app/parts/_default.html',
                    controller: 'MainController'
                }
            }
        }).state('game', {
            url: "/game/:id",
            views: {
                'primary': {
                    templateUrl: 'app/parts/_game.html',
                    controller: 'GameController'
                }
            }
        });
    }]);

})(window.angular);
