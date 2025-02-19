

container = document.querySelector('.container');
resetBtn = document.querySelector('.resetBtn');


//Factory function, creating 9 empty board slots with an array
//Creating the same amount of div tiles for display of the board
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

class Players {
    constructor (){
    this.player1 = 'x';
    this.player2 = 'o';
    this.player1Score = 0;
    this.player2Score = 0;
    }
}


const players = new Players();

class GameController {
    constructor(){
    this.index = 0;
    this.counter = 0;
    }


playerMove(index) {
    if (this.counter % 2 === 0 && gameBoard.board[index] === '') {
        gameBoard.board[index] = players.player1;
        this.counter++;
    } else if (gameBoard.board[index] === '') {
        gameBoard.board[index] = players.player2;
        this.counter++;
    } else return;
    console.log(gameBoard.board);
    console.log(this.counter);
};

resetBoard() {
    gameBoard.board = [];
    for (let i = 0; i < 9; i++) {
        gameBoard.board.push('');
    }
    const tiles = document.querySelectorAll('.tiles');
    tiles.forEach(index => {
        index.textContent = '';
    });
    document.body.addEventListener('click', display.onClick);
};
}

const gameController = new GameController();

class Display {

onClick (e) {
    const index = e.target.getAttribute('data-index');
    const tile = document.querySelector(`[data-index='${index}']`);
    console.log(`Tile clicked: ${index}`);
    gameController.playerMove(index);
    if (gameBoard.board[index] === "o" && !tile.firstChild) {
        const img = document.createElement('img');
        img.src = 'o.png';
        img.alt = 'o';
        img.width = 50;
        tile.appendChild(img);
    } else if (gameBoard.board[index] === "x" && !tile.firstChild) {
        const img = document.createElement('img');
        img.src = 'x.png';
        img.alt = 'x';
        img.width = 50;
        img.height = 50;
        tile.appendChild(img);
    }
    gameLogic.checkWin();
};

displayScore () {
    const displayPlayer1Score = document.querySelector('#player1');
    const displayPlayer2Score = document.querySelector('#player2');
    displayPlayer1Score.textContent = players.player1Score;
    displayPlayer2Score.textContent = players.player2Score;
};

reset () {
    resetBtn.addEventListener('click', () => {
        gameController.resetBoard();
    });
};
}

const display = new Display();
display.reset();

class GameLogic {

checkWin() {
    if (
        (gameBoard.board[0] === gameBoard.board[1] && gameBoard.board[1] === gameBoard.board[2] && gameBoard.board[0] !== '') ||
        (gameBoard.board[3] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[5] && gameBoard.board[3] !== '') ||
        (gameBoard.board[6] === gameBoard.board[7] && gameBoard.board[7] === gameBoard.board[8] && gameBoard.board[6] !== '')
    ) {
        if (gameController.counter % 2 === 0) {
            players.player2Score++;
            document.body.removeEventListener('click', display.onClick);
            alert("Player O is the weiner!");
        } else {
            players.player1Score++;
            alert("Player X is the weiner!");
            document.body.removeEventListener('click', display.onClick);
        }
        display.displayScore();
        return;
    }

    if (
        (gameBoard.board[0] === gameBoard.board[3] && gameBoard.board[3] === gameBoard.board[6] && gameBoard.board[0] !== '') ||
        (gameBoard.board[1] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[7] && gameBoard.board[1] !== '') ||
        (gameBoard.board[2] === gameBoard.board[5] && gameBoard.board[5] === gameBoard.board[8] && gameBoard.board[2] !== '')
    ) {
        if (gameController.counter % 2 === 0) {
            players.player2Score++;
            document.body.removeEventListener('click', display.onClick);
            alert("Player O is the weiner!");
        } else {
            players.player1Score++;
            document.body.removeEventListener('click', display.onClick);
            alert("Player X is the weiner!");
        }
        display.displayScore();
        return;
    }

    if (
        (gameBoard.board[0] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[8] && gameBoard.board[0] !== '') ||
        (gameBoard.board[2] === gameBoard.board[4] && gameBoard.board[4] === gameBoard.board[6] && gameBoard.board[2] !== '')
    ) {
        if (gameController.counter % 2 === 0) {
            players.player2Score++;
            document.body.removeEventListener('click', display.onClick);
            alert("Player O is the weiner!");
        } else {
            players.player1Score++;
            document.body.removeEventListener('click', display.onClick);
            alert("Player X is the weiner!");
        }
        display.displayScore();
        return;
    }

    if (gameBoard.board.every(index => index !== '')) {
        alert('It\'s a draw, go agannnee!');
        return;
    }
};
}
const gameLogic = new GameLogic();
document.body.addEventListener('click', display.onClick);

