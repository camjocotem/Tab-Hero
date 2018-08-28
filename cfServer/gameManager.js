String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

var GameManager = {},
    bgLine = '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
    lineStates = {
        "low": "_",
        "med": "―",
        "high": "¯"
    },
    backgroundCharacter = '░';
   

GameManager.player = {
        alt: lineStates.med,
        position: 0 //0 based
    };
GameManager.backgroundLine = {};
GameManager.backgroundLine.value = bgLine;
const MAX_POS = 77;
const TAB_LEN = 11;

function _changePlayerPosition(ev) {
    switch (ev) {
        case "ArrowRight":
            if (GameManager.player.position !== MAX_POS) {
                GameManager.player.position++;
            }
            break;
        case "ArrowLeft":
            if (GameManager.player.position !== 0) {
                GameManager.player.position--;
            }
            break;
        case "ArrowUp":
            if(GameManager.player.alt === lineStates.low){
                GameManager.player.alt = lineStates.med;
            }
            else if(GameManager.player.alt === lineStates.med){
                GameManager.player.alt = lineStates.high;
            }
            break;
        case "ArrowDown":
            if(GameManager.player.alt === lineStates.high){
                GameManager.player.alt = lineStates.med;
            }
            else if(GameManager.player.alt === lineStates.med){
                GameManager.player.alt = lineStates.low;
            }
            break;
        default:
            throw "A direction is required in order to move the player.";
    }
    
    return GameManager.player;
}

GameManager.getPlayer = function(){
    return GameManager.player;
}

GameManager.getSpinningChar = function* getSpinningChar() {
    while (true) {
        yield "-";
        yield "\\";
        yield "|";
        yield "/";
    }
}

GameManager.getTabText = function(tab){
    let startPos = (tab - 1 ) * TAB_LEN;    
    return GameManager.backgroundLine.value.substr(startPos, TAB_LEN);
}

GameManager.movePlayer = function(ev){
    console.log("GameManager.movePlayer:", ev);
    console.log("Setting ", backgroundCharacter, " at ", GameManager.player.position);
    GameManager.updateString(backgroundCharacter, GameManager.player.position);
    _changePlayerPosition(ev);
    console.log("Setting ", GameManager.player.alt, " at ", GameManager.player.position);
    GameManager.updateString(GameManager.player.alt, GameManager.player.position);  
}

GameManager.updateString = function updateString(replacementCharacter, position) {
    if (replacementCharacter.length > 1) {
        throw "Updated character must be only one character long.";
    }

    if (position < 0 || position > 77) {
        throw "Invalid character position of " + position;
    }

    return GameManager.backgroundLine.value = GameManager.backgroundLine.value.replaceAt(position, replacementCharacter);
}

module.exports = GameManager;
