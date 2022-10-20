const playerX = 'X'
const playerY = 'O'
const winningBank = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [2, 5, 8], [1, 4, 7], [0, 3, 6], [0, 4, 8], [2, 4, 6]]
// Established Varibles and Winning Bank
// Create variables to target cell and board elements on HTML.
const cellElements = document.querySelector('.grid-item')
const board = document.querySelector('.grid-container')
const winner = document.querySelector('#winningMessage')
const restart = document.querySelector('#restart')
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`
const drawMessage = () => `Game ended in a draw!`;
const statusDisplay = document.querySelector('.game--status');
statusDisplay.innerHTML = currentPlayerTurn();

function cellClick (clickedCellEvent){
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    )
    console.log(clickedCellIndex, gameState);
    if (gameState[clickedCellIndex] !== '' ) {
        alert('Already Selected!')
        return;
        };
    if (!gameActive){
        alert('Game Ended')
        return;
    }
    console.log('click');
    cellPlayed(clickedCell, clickedCellIndex)
    readGame();
}

function readGame(){
    let roundWon = false;
    for (let i=0; i<=7; i++) {
        const winCondition = winningBank[i]
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
    }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
    }
        changePlayer();
        console.log('read');
    }

function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function changePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

function restartGame (){
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.grid-item').forEach(cell => cell.innerHTML = '');
    console.log('restart');
    gameActive = true;
}

document.querySelectorAll('.grid-item').forEach(cell => cell.addEventListener('click', cellClick))

document.querySelector('#restart').addEventListener('click', restartGame);


