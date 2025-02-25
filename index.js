const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let fieldSize;
let numberOfMove;
let field;
let isWin

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    numberOfMove = 0;
    fieldSize = prompt('Какое поле?', '3')
    isWin = false;

    if (fieldSize === null)
        startGame();
    
    field = [];
    for (let i = 0; i < fieldSize; i++) {
        field[i] = [];
        for (let j = 0; j < fieldSize; j++) {
            field[i][j] = EMPTY;
        }
    }

    renderGrid(+fieldSize);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    if (field[row][col] !== EMPTY){
        return
    }
    if (numberOfMove % 2 === 0) {
        renderSymbolInCell(ZERO, row, col);
        field[row][col] = ZERO;
    } else {
        renderSymbolInCell(CROSS, row, col);
        field[row][col] = CROSS;
    }

    numberOfMove++;
    let winner = checkWin();
    if (winner !== null) {
        coloring(winner);
        isWin = true;
    }
}

function coloring(winner) {
    const symbol = field[winner[0][0]][winner[0][1]]
    console.log(symbol);
    console.log(winner)
    for (const pos in winner) {
        const row = winner[pos][0];
        const col = winner[pos][1];
        console.log(pos)
        if (symbol === ZERO) {
            renderSymbolInCell(ZERO, row, col, '#FF0000')
        } else {
            renderSymbolInCell(CROSS, row, col, '#FF0000')
        }
    }

    announceWin(symbol)

}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    if (!isWin) {
        const targetCell = findCell(row, col);

        targetCell.textContent = symbol;
        targetCell.style.color = color;
    }
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    startGame();
    console.log('reset!');
}


function checkWin() {

    if (numberOfMove === fieldSize * fieldSize) {
        alert('Победила дружба! Начнём сначала')
        startGame();
    }

    for (let i = 0; i < fieldSize; i++) {
        if (field[i][0] !== EMPTY && field[i].every(cell => cell === field[i][0])) {
            return field[i].map((_, j) => [i, j]);
        }
    }

    for (let j = 0; j < fieldSize; j++) {
        if (field[0][j] !== EMPTY && field.every(row => row[j] === field[0][j])) {
            return field.map((_, i) => [i, j]);
        }
    }

    if (field[0][0] !== EMPTY && field.every((row, i) => row[i] === field[0][0])) {
        return field.map((_, i) => [i, i]);
    }

    if (field[0][fieldSize - 1] !== EMPTY && field.every((row, i) => row[fieldSize - 1 - i] === field[0][fieldSize - 1])) {
        return field.map((_, i) => [i, fieldSize - 1 - i]);
    }

    return null;
}

function announceWin(winner) {
    alert(`Победили ${winner}`)
}

/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
