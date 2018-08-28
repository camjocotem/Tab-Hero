(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('GameController', ['$scope', '$stateParams', 'mySocket', 'app_env', function ($scope, $stateParams, mySocket, app_env) {
        document.title = $stateParams.id;
        var currentTab = parseInt($stateParams.id);

        mySocket.emit('tabConnected', currentTab);
        if (currentTab !== 7) {
            window.open(app_env.baseUrl + '#/game/' + (currentTab + 1));
        }

        mySocket.on('updateTitle', function (title) {
            document.title = title;
        });
    }]);
})(window.angular);
