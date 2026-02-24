let board = document.getElementById("board");
let statusText = document.getElementById("status");
let tapSound = document.getElementById("tapSound");

let p1Name = document.getElementById("p1Name");
let p2Name = document.getElementById("p2Name");
let p1Timer = document.getElementById("p1Timer");
let p2Timer = document.getElementById("p2Timer");

let cells = [];
let currentPlayer = "X";
let timer;
let timeLeft = 10;
let moveHistory = [];

function startGame() {

    board.innerHTML = "";
    cells = Array(9).fill("");
    moveHistory = [];

    let name1 = document.getElementById("player1Input").value.trim();
    let name2 = document.getElementById("player2Input").value.trim();

    p1Name.textContent = name1 ? name1 + " (X)" : "Player 1 (X)";
    p2Name.textContent = name2 ? name2 + " (O)" : "Player 2 (O)";

    currentPlayer = document.getElementById("firstTurn").value;

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleClick(i));
        board.appendChild(cell);
    }

    updateStatus();
    startTimer();
}

function handleClick(index) {
    if (cells[index] !== "") return;

    tapSound.play();

    if (moveHistory.length >= 3) {
        let oldIndex = moveHistory.shift();
        cells[oldIndex] = "";
        board.children[oldIndex].textContent = "";
    }

    cells[index] = currentPlayer;
    board.children[index].textContent = currentPlayer;
    moveHistory.push(index);

    checkWinner();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    resetTimer();
    updateStatus();
}

function updateStatus() {
    statusText.textContent = currentPlayer + "'s Turn";
}

function startTimer() {
    timeLeft = 10;
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) switchPlayer();
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

function updateTimer() {
    if (currentPlayer === "X") {
        p1Timer.textContent = timeLeft;
        p2Timer.textContent = 10;
    } else {
        p2Timer.textContent = timeLeft;
        p1Timer.textContent = 10;
    }
}

function checkWinner() {
    let combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let combo of combos) {
        let [a,b,c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            combo.forEach(i => board.children[i].classList.add("win"));
            alert(cells[a] + " Wins!");
            clearInterval(timer);
        }
    }
}

function undoMove() {
    if (moveHistory.length === 0) return;

    let last = moveHistory.pop();
    cells[last] = "";
    board.children[last].textContent = "";
}

function restartGame() {
    clearInterval(timer);
    startGame();
}
