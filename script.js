container = document.querySelector('.container');
resetBtn = document.querySelector('.resetBtn');
// score = document.querySelector('.score');

//Factory function, each empty array slot is a board slot
let gameBoard = (() => {
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push("");
        createDiv = document.createElement('div');
        createDiv.classList.add(`tiles`);
        createDiv.setAttribute('data-index', `${i}`);

        container.appendChild(createDiv);

    }
    return { board };
})();
console.log(gameBoard.board);


const players = {
    player1: 'x',
    player2: 'o',
    player1Score: 0,
    player2Score: 0
}


const gameController = {
    index: 0,
    counter: 0,
    //adds player symbol to the board, alternating between player with a counter++
    playerMove: (index) => {
        //if counter is even
        if (gameController.counter % 2 === 0 &&
            //and the array index is empty
            gameBoard.board[index] === '') {
            //add player 1 to the board
            gameBoard.board[index] = players.player1;
            gameController.counter++;


            //else if its odd and empty, add player 2
        } else if (gameBoard.board[index] === '') {
            gameBoard.board[index] = players.player2;
            gameController.counter++;

        } else return;
        console.log(gameBoard.board);
        console.log(gameController.counter);
    },

    resetBoard: () => {
        gameBoard.board = [];
        for (i = 0; i < 9; i++) {
            gameBoard.board.push('');
        }
        tiles = document.querySelectorAll('.tiles');
        tiles.forEach(index => {
            index.textContent = ''
        });
    },

};


//on click get attribbute of tile which matches the index of the gameBoard array, 
//Then inputting x/o into the array with the playerMove() and adding to the onscreen display
let display = {


    onClick: document.body.addEventListener('click', (e) => {
        let index = e.target.getAttribute('data-index');
        let tile = document.querySelector(`[data-index='${index}']`);

        console.log(index)
        gameController.playerMove(index);
        if (gameBoard.board[index] === "o") {

            const img = document.createElement('img');
            img.src = 'x-and-o.png';
            img.alt = 'o';
            img.width = 50;
            tile.appendChild(img);
        } else if (gameBoard.board[index] === "x") {

            const img = document.createElement('img');
            img.src = 'x.png';
            img.alt = 'x';
            img.width = 50;
            img.height = 50;
            tile.appendChild(img);
        }
        gameLogic.checkWin()
    }),
    displayScore: () => {
        let displayPlayer1Score = document.querySelector('#player1');
        let displayPlayer2Score = document.querySelector('#player2');
        displayPlayer1Score.textContent = players.player1Score;
        displayPlayer2Score.textContent = players.player2Score;
    },

    reset: resetBtn.addEventListener('click', () => {
        gameController.resetBoard();
    }),

};

const gameLogic = {
    checkWin: () => {
        // Check rows for matching x / o
        if (
            (gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[1] === gameBoard.board[2] && gameBoard.board[0] !== '') ||
            (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[5] && gameBoard.board[3] !== '') ||
            (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[7] === gameBoard.board[8] && gameBoard.board[6] !== '')

        ) {
            if (gameController.counter % 2 === 0) {
                players.player2Score++;
                alert("Player 2 is the weiner!");
            } else {
                players.player1Score++;
                alert("Player 1 is the weiner!");
            }
            
        }

        // Check columns
        if (
            (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[3] === gameBoard.board[6] && gameBoard.board[0] !== '') ||
            (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[7] && gameBoard.board[1] !== '') ||
            (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[8] && gameBoard.board[2] !== '')
        ) {
            if (gameController.counter % 2 === 0) {
                players.player2Score++;

                alert("Player 2 is the weiner!");

            } else {
                players.player1Score++;
                alert("Player 1 is the weiner!");
            }


        }

        // Check diagonals
        if (
            (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[8] && gameBoard.board[0] !== '') ||
            (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[6] && gameBoard.board[2] !== '')
        ) {
            if (gameController.counter % 2 === 0) {
                players.player2Score++;

                alert("Player 2 is the weiner!");
            } else {
                players.player1Score++;
                alert("Player 1 is the weiner!");
            }


        }

        if (gameBoard.board.every(index => index !== '')) {
            alert('It\'s a draw, go agannnee!')

        }
        display.displayScore();
    }
};


