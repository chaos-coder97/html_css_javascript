document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                highlightWinner(pattern);
                message.textContent = `Player ${gameBoard[a]} wins!`;
                break;
            }
        }

        if (!gameBoard.includes('') && gameActive) {
            gameActive = false;
            message.textContent = "It's a draw!";
        }
    };

    const highlightWinner = (pattern) => {
        for (let index of pattern) {
            cells[index].style.backgroundColor = '#90EE90';
        }
    };

    const handleCellClick = (index) => {
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            checkWinner();

            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });
});
