container = document.querySelector('.container');


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
    player2: 'o'
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
        gameLogic.checkWin();
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

const gameLogic = {
    checkWin: () => {
        // Check rows for matching x / o
        if (
            (gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[1] === gameBoard.board[2] && gameBoard.board[0] !== '') ||
            (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[5] && gameBoard.board[3] !== '') ||
            (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[7] === gameBoard.board[8] && gameBoard.board[6] !== '')
        ) {
            console.log("We got a wiener!");
            gameController.resetBoard();
            return true;
        }

        // Check columns
        if (
            (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[3] === gameBoard.board[6] && gameBoard.board[0] !== '') ||
            (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[7] && gameBoard.board[1] !== '') ||
            (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[8] && gameBoard.board[2] !== '')
        ) {
            console.log("We got a wiener!");
            gameController.resetBoard();
            return true;
        }

        // Check diagonals
        if (
            (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[8] && gameBoard.board[0] !== '') ||
            (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[6] && gameBoard.board[2] !== '')
        ) {
            console.log("We got a wiener!");
            gameController.resetBoard();
            return true;
        }
        return false;
    }
};

//on click get attribbute of tile, use that as a parameter for the player move function, inputting x/o into the array
let display = {


    onClick: document.body.addEventListener('click', (e) => {
        let index = e.target.getAttribute('data-index');
        let tile = document.querySelector(`[data-index='${index}']`);;
        console.log(index)
        gameController.playerMove(index);
        if (gameBoard.board[index] === "o") {
            
            const img = document.createElement('img');
            img.src = 'x-and-o.png'; // Replace with your image URL
            img.alt = 'o'; // Optional: accessibility text
            img.width = 50; // Set width if needed
            img.height = 50; // Set height if needed

            // Clear text content and append image
            tile.textContent = '';
            tile.appendChild(img);
        } else if (gameBoard.board[index] === "x") {
            
            const img = document.createElement('img');
            img.src = 'x.png'; // Replace with your image URL
            img.alt = 'x'; // Optional: accessibility text
            img.width = 50; // Set width if needed
            img.height = 50; // Set height if needed

            // Clear text content and append image
            tile.textContent = '';
            tile.appendChild(img);
        }


    })

}; 