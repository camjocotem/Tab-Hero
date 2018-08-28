var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var env = require('node-env-file');
var tabManager = require('./tabStore');
var GameManager = require('./gameManager');

env(__dirname + '/../.env');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var spinningItr = GameManager.getSpinningChar();

app.use('/', express.static('../www/src/'));

io.sockets.on('connection', function (socket) {
    socket.on('tabConnected', function (tabNumber) {
        tabManager.addTab(socket, tabNumber);
        if (tabNumber === 7) {
            var tab = tabManager.getTab(1);
            io.sockets.to(tab.id).emit('gameReady', true);
        }
    });

    socket.on('startGame', function (msgPayload) {
        updateTabs();
        let player = GameManager.getPlayer();
        setTabText(1, GameManager.updateString(player.alt, 0));
    });

    socket.on('playerMove', function (ev) {
        console.log("Player move event with:", ev);
        GameManager.movePlayer(ev);        
        updateTabs();
    })

    socket.on('disconnect', function () {
        tabManager.clearTabs(socket);
    });

    function setTabText(tabNo, text) {
        io.sockets.to(tabManager.getTab(tabNo).id).emit('updateTitle', text);
    }

    function updateTabs() {
        for (var i = 1; i < 8; i++) {
            setTabText(i, GameManager.getTabText(i));
        }
    }
});

http.listen(process.env.PORT, function () {
    console.log("Listening on port ", process.env.PORT);
});
