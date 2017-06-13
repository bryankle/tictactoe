$(document).ready(function() {
// Initiate jQuery for fade in and fade out animation when selecting game type & number of players
// jQuery used in this application for fadeIn, fadeOut, slideDown, SlideIn
$('.player-btn').click(function() {
    var selectSymbol = $('.select-symbol');
    $('.select-player').fadeOut('slow',function(){
    })
    $('.select-symbol').fadeIn('slow', function() {
    })
});
$('.symbol-btn').click(function() {

    $('.select-symbol').fadeOut('slow',function(){
    })
    $('.score').slideDown('slow',function() {
        $('.container').fadeIn('slow', function(){
    })
    })
})

var currentShape, // Changes with two player but remains constant for one player
    playerMode, // one or two
    player, // player is the AI
    opponent, // opponent is the main player
    scoreX = parseInt(document.getElementById('js--score-x').firstChild.nodeValue),
    scoreO = parseInt(document.getElementById('js--score-o').firstChild.nodeValue);
// Collection of game types (1 / 2 player game)
var selectPlayers = {
    onePlayer: document.getElementById('one-player'),
    twoPlayer: document.getElementById('two-player')
}

// Initiates 1 or 2 player game
function selectPlayer() {
    if (this == selectPlayers.onePlayer) {
        playerMode = 'one';
    }
    else if (this == selectPlayers.twoPlayer) {
        playerMode = 'two';
    }
}
// Listens to buttons for selecting 1 or 2 player game
for (prop in selectPlayers) {
    selectPlayers[prop].addEventListener('click', selectPlayer)
}
// Collection of shapes (X & O)
var selectShapes = {
    selectX: document.getElementById('select-x'),
    selectO: document.getElementById('select-o')
}
// Assigns a shape to player & player or player & AI
// Player 1 selects a shape and other shape is automatically assigned to player 2 or AI
function selectShape() {
    // One player mode
    if (playerMode == 'one') {
        if (this == selectShapes.selectX) {
            opponent = 'X'; // Me
            player = 'O';
        }
        else {
            opponent = 'O';
            player = 'X'
        }
    }
    // Two player mode
    else if (playerMode == 'two') {
        if (this == selectShapes.selectX) {
            currentShape = 'X';
        }
        else if (this == selectShapes.selectO) {
            currentShape = 'O'
        }
    }
}
// Listens to buttons for selecting shapes (X & O)
for (prop in selectShapes) {
    selectShapes[prop].addEventListener('click', selectShape)
}
// Collection of cells referencing respective DOM node,
// each representing a square on the tac-tac-toe board
var cells = {
    // Row 1
    cell00: document.getElementById('cell-00'),
    cell01: document.getElementById('cell-01'),
    cell02: document.getElementById('cell-02'),
    // Row 2
    cell10: document.getElementById('cell-10'),
    cell11: document.getElementById('cell-11'),
    cell12: document.getElementById('cell-12'),
    // Row 3
    cell20: document.getElementById('cell-20'),
    cell21: document.getElementById('cell-21'),
    cell22: document.getElementById('cell-22'),
}
// Assigns event listeners to all table cells
for (prop in cells) {
    cells[prop].addEventListener('click', checkCell);
}
// Verify if cell is empty
function checkCell() {
    console.log(this)
    var id = this.getAttribute('id');
    var row = id.substr(id.length - 2, 1);
    var col = id.substr(id.length - 1, 1);
    // Execute if two player mode is active
    if (board[row][col] == '_' && playerMode == 'two') {
        printShape(this, currentShape);
        updateBoard(this, currentShape);
        checkVictory();
        changeShapes();
    }
    // Execute if one player mode is active
    else if (board[row][col] == '_' && playerMode == 'one') {
        printShape(this, opponent);
        updateBoard(this, opponent);
        // Initiate AI
        findBestMove();
        checkVictory(); // Checks for victory
    }
   
}
// Update visible board with shape
function printShape(a, currentShape) {
        var p = document.createElement('p');
        // var shape decides what type of shape the current player can control.
        // In the case of 1 player mode, shape will remain constant, but will change between 2 players
        var shape = playerMode == 'two' ? currentShape : opponent;
        var text = document.createTextNode(shape);
        // Attach to DOM
        p.appendChild(text);
        a.appendChild(p);

}
// Array representation of game board
var board = [ [ '_', '_', '_' ],
              [ '_', '_', '_' ],
              [ '_', '_', '_' ]
            ];

            

// Update board array with cell value 
var updateBoard = function(a, currentShape) {
    var id = a.getAttribute('id');
    var row = id.substr(id.length - 2, 1);
    var col = id.substr(id.length - 1, 1);
    board[row][col] = currentShape;
}.bind(cells);

// Changes active shape between 2 players; only active in 2 player mode
function changeShapes() {
    if (currentShape == 'X') {
        currentShape = 'O';
    }
    else if (currentShape == 'O') {
        currentShape = 'X';
    }
}

// Checks for victory if 3 in a row of same shape is detected
function checkVictory() {
    var winningShape = currentShape ? currentShape : player;
    for (row = 0; row < 3; row++) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
            if (board[row][0] == 'X' || board[row][0] == 'O') {
                addPointsToWinner(winningShape);
            }
        }
    }
    for (col = 0; col < 3; col++) {
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
            if (board[0][col] == 'X' || board[0][col] == 'O') {
                addPointsToWinner(winningShape);
            }
        }
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        if (board[0][0] == 'X' || board[0][0] == 'O') {
                addPointsToWinner(winningShape);
            }
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        if (board[0][2] == 'X' || board[0][2] == 'O') {
                addPointsToWinner(winningShape);
            }
    }
    if (isMovesLeft() == false) {
        declareWinner('none');
    }
}
// Add points to score board after end of each game
// addPointsToWinner accepts a shape 'a' as an argument and adds points to player
function addPointsToWinner(a) {
    var getScoreX = document.getElementById('js--score-x').firstChild.nodeValue;
    var getScoreO = document.getElementById('js--score-o').firstChild.nodeValue;
    declareWinner(a)
    if (a == 'X') {
        scoreX++;
        document.getElementById('js--score-x').firstChild.nodeValue = scoreX;
    }
    else if (a == 'O') {
        scoreO++;
        document.getElementById('js--score-o').firstChild.nodeValue = scoreO;
    }

}
// AI Functionality below
function aiTurn(row, col, player) {
    aiMove(row, col, player);
    updateBoardAI(row, col, player);
}

// 1 Player function
function aiMove(row, col, player) {
    var getCell = cells['cell' + row + col];
    var p = document.createElement('p');
    var text = document.createTextNode(player);
    p.appendChild(text);
    getCell.appendChild(p);
}

function updateBoardAI(row, col, player) {
    board[row, col] == player;
}
// Determines if there are any cells remaining
function isMovesLeft() {
    var boo = false;
    board.forEach(function(row) {
        row.forEach(function(val) {
            if (val == '_') {
                boo = true;
            }
        })
    })
    return boo;
}
// Evaluates state of board to check if victory has occured
function evaluate() {
    // Check rows for victory
    for (row = 0; row <=2; row++) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
            
            if (board[row][0] == player) {
                return 10;
            }
            else if (board[row][0] == opponent) {
                return -10;
            }
        }
    }
    // Check columns for victory
    for (col = 0; col <= 2; col++) {
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
            if (board[0][col] == player) {
                return 10;
            }
            else if (board[0][col] == opponent) {
                return -10;
            }
        }
    }
    // Check diagonals for victory
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        if (board[0][0] == player) {
            return 10;
        }
        else if (board[0][0] == opponent) {
            return -10;
        }
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        if (board[0][2] == player) {
            return 10;
        }
        else if (board[0][2] == opponent) {
            return -10;
        }
    }       
    return 0;
}

// Minimax implementation for AI
/*
    First player is the maximizer
    If I go first, I am the maxmizer; isMax = false;
    If AI goes first, AI is the maximizer; isMax = true;
*/
function minimax(board, depth, isMax) { // isMax is true when player goes second; false when player goes first
    var score = evaluate();
    var best = 0;
    console.log('score: ' + score);
    //If maximizer has won the game return their evaluated score
    if (score == 10) {
        return score;
    }
    // If minimizer has won the game return their evaluated score
    if (score == -10) {
        return score;
    }    
    // If there are no moves left and no winner; tie
    if (!isMovesLeft()) {
        return 0;
    }
    // Execute if this is maximizer's move
    if (isMax) {
        best = -1000;   
        board.forEach(function(i, row) {
            i.forEach(function(j, col) {
                if (board[row][col] == '_') {
                    // Make the move
                    board[row][col] = player;
                    // Call minimax recursively and choose the max value
                    best = Math.max(best, minimax(board, depth+1, !isMax));
                       
                    // Undo move
                    board[row][col] = '_';
                }
            })
        })
        return best;
    }
    // Execute if minimizer's move
    // AI will always be minimizer because player will always go first
    else if (!isMax) {
        best = 1000;
        board.forEach(function(i, row) {
            i.forEach(function(j, col) {
                if (board[row][col] == '_') {
                    // Make the move
                    board[row][col] = opponent;
                    // Call minimax recursively and choose the max value
                    best = Math.min(best, minimax(board, depth+1, !isMax));
                     // Undo move
                    board[row][col] = '_';
                }
            })
        })
        return best;
    }
}

function findBestMove() {

    var bestVal = -1000;
    var bestMoveRow,
        bestMoveCol;
   
    board.forEach(function(i, row) {
        i.forEach(function(j, col) {
            if (board[row][col] == '_') {
                    board[row][col] = player;
                    // Compute the evaluation function for this move
                    var moveVal = minimax(board, 10, false);
                    // Undo the move
                    board[row][col] = '_';
                    // If the value of the current move is more than the best value, then update the best
                    if (moveVal > bestVal) {
                        bestMoveRow = row;
                        bestMoveCol = col;
                        bestVal = moveVal;
                    }
                }
        })
    })
    board[bestMoveRow][bestMoveCol] = player;
    aiTurn(bestMoveRow, bestMoveCol, player);
}
// Reset game after winner has been declared
var resetGame = function () {
    for (prop in cells) {
        if (cells[prop].firstChild !== null) {
            cells[prop].removeChild(cells[prop].firstChild);
        }
    }
    board = [ [ '_', '_', '_' ],
              [ '_', '_', '_' ],
              [ '_', '_', '_' ]
            ];

}.bind(cells);

function declareWinner(a) {
    console.log(a)
    if (a !== 'none') {
        var text = document.createTextNode(a + ' wins');
    }
    else if(a == 'none') {
        var text = document.createTextNode('Draw');
    }
    var h1 = document.createElement('h1');
    h1.appendChild(text);
    var getOverlay = document.getElementById('end');
    getOverlay.appendChild(h1);
    $(getOverlay).fadeIn('slow');
    $(getOverlay).click(function() {
        $(getOverlay).fadeOut(function() {
            resetGame();
        })
    })
    getOverlay.removeChild(getOverlay.firstChild)
}

}); // End of jQuery wrapper
