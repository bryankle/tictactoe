var currentShape, // Changes with two player but remains constant for one player
    playerMode, // one or two
    player, // player is the AI
    opponent; // opponent is the main player

var selectPlayers = {
    onePlayer: document.getElementById('one-player'),
    twoPlayer:document.getElementById('two-player')
}

function selectPlayer() {

    if (this == selectPlayers.onePlayer) {
        playerMode = 'one';
    }
    else if (this == selectPlayers.twoPlayer) {
        playerMode = 'two';
    }

    var prompt1 = document.getElementById('inner-prompt-1');
    prompt1.style.display = 'none';
    var prompt2 = document.getElementById('inner-prompt-2');
    prompt2.style.display = 'block';
}

for (prop in selectPlayers) {
    selectPlayers[prop].addEventListener('click', selectPlayer)
}

var selectShapes = {
    selectX: document.getElementById('select-x'),
    selectO: document.getElementById('select-o')
}
// Select shape according to button clicked on prompt
function selectShape() {
    console.log(this)
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

    // Sets shape for two player mode
    else if (playerMode == 'two') {
        if (this == selectShapes.selectX) {
            currentShape = 'X';
        }
        else if (this == selectShapes.selectO) {
            currentShape = 'O'
        }
    }
    
    var outerPrompt = document.getElementById('outer-prompt');
    outerPrompt.style.display = 'none';
}

for (prop in selectShapes) {
    selectShapes[prop].addEventListener('click', selectShape)
}

var cells = {
    cell00: document.getElementById('cell-00'),
    cell01: document.getElementById('cell-01'),
    cell02: document.getElementById('cell-02'),

    cell10: document.getElementById('cell-10'),
    cell11: document.getElementById('cell-11'),
    cell12: document.getElementById('cell-12'),

    cell20: document.getElementById('cell-20'),
    cell21: document.getElementById('cell-21'),
    cell22: document.getElementById('cell-22'),
}

for (prop in cells) {
    cells[prop].addEventListener('click', checkCell);
}
// Verify cell contains no shape before updating cell
function checkCell() {
    console.log(this)
    var id = this.getAttribute('id');
    var row = id.substr(id.length - 2, 1);
    var col = id.substr(id.length - 1, 1);
    //console.log(a);
    // LEFT OFF HERE: FIND A WAY TO LOCATE PRESENCE OF SHAPE INSIDE CELL USING INTERNAL BOARD ARRAY
    if (board[row][col] == '_' && playerMode == 'two') {
        printShape(this, currentShape);
        updateBoard(this, currentShape);
        checkVictory();
        changeShapes();
    }
    else if (board[row][col] == '_' && playerMode == 'one') {
        printShape(this, opponent);
        updateBoard(this, opponent);

        // AI goes
        findBestMove();

    }
   
}
// Update visible board with shape
function printShape(a, currentShape) {
   // updateBoard(this, currentShape); // Updates board array; this is passed from event handler
    
        //console.log(checkCell(this))
        var p = document.createElement('p');
        // var shape will be determine based one one/two player mode
        var shape = playerMode == 'two' ? currentShape : opponent;
        var text = document.createTextNode(shape);
        p.appendChild(text);
        a.appendChild(p);

}


/*
var board = [ [ ['_'], ['_'], ['_'] ],
              [ ['_'], ['_'], ['_'] ],
              [ ['_'], ['_'], ['_'] ]
            ];
            */

var board = [ [ '_', '_', '_' ],
              [ '_', '_', '_' ],
              [ '_', '_', '_' ]
            ];

            

// Update board array with cell value 
var updateBoard = function(a, currentShape) {
//console.log(a);
    var id = a.getAttribute('id');
    var row = id.substr(id.length - 2, 1);
    var col = id.substr(id.length - 1, 1);
    
    board[row][col] = currentShape;
    //console.log(board);
}.bind(cells);

function changeShapes() { // For Two Player
    if (currentShape == 'X') {
        currentShape = 'O';
    }
    else if (currentShape == 'O') {
        currentShape = 'X';
    }
}
function setShapePlayerAI() {

}
 
// Implement both for one and two player
// Two player will contain another function dedicated for AI
function checkVictory() {

    for (row = 0; row < 3; row++) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) {
            if (board[row][0] == 'X' || board[row][0] == 'O') {
                alert('Winner!')
            }
        }
    }
    for (col = 0; col < 3; col++) {
        if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) {
            if (board[0][col] == 'X' || board[0][col] == 'O') {
                alert('Winner!')
            }
        }
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        if (board[row][0] == 'X' || board[row][0] == 'O') {
                alert('Winner!')
            }
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        if (board[row][2] == 'X' || board[row][2] == 'O') {
                alert('Winner!')
            }
    }
    
}

// Return to later after finalizing CSS; no point in spending time on this feature now only to change it later
function declareWinner() {
    var prompt3 = document.getElementById('inner-prompt-3');
    prompt3.style.display = 'block';

}

function aiTurn(row, col, player) {
    // Add condition to ensure cell is empty before allowing move
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
var isMovesLeft = function() {
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

function copyArray(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copyArray(v) : v;
   }
   return output;
}

function evaluate() {
    //var score = 0;
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

function minimax(board, depth, isMax) { // isMax is true when player goes second; false when player goes first
    var score = evaluate();
    var best = 0;
    console.log('score: ' + score);
    //If maximizer has won the game return their evaluated score

    
    if (score == 10) {
        console.log('1')
        return score;
    }
    // If minimizer has won the game return their evaluated score
    if (score == -10) {
        console.log('f')
        return score;
    }    
    // If there are no moves left and no winner; tie
    if (!isMovesLeft()) {
        console.log('d')
        return 0;
    }

    
    
    // If this is maximizer's move
    if (isMax) {
        console.log('maximizer')
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

    

    // If minimizer's move
    else if (!isMax) {
        console.log('minimizer')
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
                console.log('test');
                var moveVal = minimax(board, 0, false);
                // Undo the move
                console.log('test');
                board[row][col] = '_';
                console.log('moveVal: ' + moveVal);
                console.log('bestVal: ' + bestVal)
                // If the value of the current move is more than the best value, then update the best
                if (moveVal > bestVal) {
                    console.log('i: ' + i);
                    console.log('j: ' + j)

                    bestMoveRow = row;
                    bestMoveCol = col;

                    console.log('bestMoveRow: ' + bestMoveRow)
                    console.log('bestMoveCol: ' + bestMoveCol)
                    bestVal = moveVal;
                }
            }
    })
})
     console.log('bestMoveRow: ' + bestMoveRow)
    console.log('bestMoveCol: ' + bestMoveCol)
    board[bestMoveRow][bestMoveCol] = player;
    aiTurn(bestMoveRow, bestMoveCol, player);
    console.log('The best move is col: ' + bestMoveRow + 'row: ' + bestMoveCol);
}

// First player is the maximizer
// If I go first, I am the maxmizer; isMax = false;
// If AI goes first, AI is the maximizer; isMax = true;