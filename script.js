//Factory function, each empty array slot is a board slot
let gameBoard = (() => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push("")
    }
    return { board };
})();
console.log(gameBoard.board);

const players = {
    player1: 'x',
    player2: 'o'
}


const gameController = {
    x: 0,
    o: 0,
    index: 0,
    counter: 0,
    

    //adds player symbol to the board, alternating between player with a counter
    playerMove: (index) => {
        //if counter is even
        if (gameController.counter % 2 === 0 &&
            //and the array index is empty
            gameBoard.board[index] === '') {
                //add player 1 to the board
            gameBoard.board[index] = players.player1;
            gameController.counter++;
            
            //else if its odd and empty, add player 2
        } else if (gameBoard.board[index] === ''){
            gameBoard.board[index] = players.player2;
            gameController.counter++;
            
        }
        
        console.log(gameBoard.board);
        checkWin();
      }
    };

    
    const checkWin = () => {
        // Check rows
        if (
            (gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[1] === gameBoard.board[2] && gameBoard.board[0] !== '') ||
            (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[5] && gameBoard.board[3] !== '') ||
            (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[7] === gameBoard.board[8] && gameBoard.board[6] !== '')
        ) {
            console.log("We got a winner!");
            return true;
        }
    
        // Check columns
        if (
            (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[3] === gameBoard.board[6] && gameBoard.board[0] !== '') ||
            (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[7] && gameBoard.board[1] !== '') ||
            (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[8] && gameBoard.board[2] !== '')
        ) {
            console.log("We got a winner!");
            return true;
        }
    
        // Check diagonals
        if (
            (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[8] && gameBoard.board[0] !== '') ||
            (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[6] && gameBoard.board[2] !== '')
        ) {
            console.log("We got a winner!");
            return true;
        }
    
        return false; // No winner yet
    };
    



