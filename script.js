const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

//Creates an array with child arrays with right combinations of numbers
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6,  7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Creates the cellElements variable representing all cells, selecting them by the data-cell attribute
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn 

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show');
}

function handleClick(event) {
    const cell = event.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false, currentClass)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
 
}
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
    
}

function isDraw() {
    return [...cellElements].every((cell) => { //with [...cellElements] we destructure it into an array.
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    //The some() method checks if at least one of the winning combinations satisfies a condition 
    return WINNING_COMBINATIONS.some((combination) => { //The function (combination) => {...} checks each combination in the array.
        return combination.every((index) => { //The method every() checks if all indices in that combination meet the condition.
            return cellElements[index].classList.contains(currentClass)
            //The function combination.every((index) => {...}) checks whether the cell at position 'index' in the cellElements list has the class 'currentClass', if yes it returns 'true'
        })
    })
}