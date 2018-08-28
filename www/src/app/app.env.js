(function () {
    'use strict';

    angular
        .module('app')
        .factory('app_env', function app_env() {
            return {
                baseUrl: 'http://localhost:3001/'
            };
        });
})(window.angular);
