(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('MainController', ['$scope', 'app_env', 'mySocket', function ($scope, app_env, mySocket) {
        var mn = this;
        
        mn.playGame = function(){
            document.title = 1;
            mySocket.emit('tabConnected', 1);
            window.open(app_env.baseUrl + '#/game/2');
        }
        
        mySocket.on('gameReady', function(){
            $scope.gameIsReady = true;
            alert("Ready!");
            mySocket.emit('startGame');
        });
        
        mySocket.on('updateTitle', function(title){
            document.title = title;
        });
        
        mn.moveCharacter = function(ev){
            if(ev.key === "ArrowUp" || ev.key === "ArrowDown" || ev.key === "ArrowLeft" || ev.key === "ArrowRight"){
                mySocket.emit('playerMove', ev.key);
            }
        }
    }]);
})(window.angular);