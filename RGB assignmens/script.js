// Game state
let gameState = {
    colors: [],
    correctIndex: 0,
    targetRgb: '',
    score: 0,
    streak: 0,
    isGameOver: false,
    difficulty: 'easy' // 'easy' or 'hard'
};

// DOM elements
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const targetRgbElement = document.getElementById('targetRgb');
const gameMessageElement = document.getElementById('gameMessage');
const colorGridElement = document.getElementById('colorGrid');
const difficultyBtn = document.getElementById('difficultyBtn');
const resetBtn = document.getElementById('resetBtn');

// Generate random RGB color
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Initialize new game
function initializeGame() {
    const numColors = gameState.difficulty === 'easy' ? 3 : 6;
    gameState.colors = [];
    
    for (let i = 0; i < numColors; i++) {
        gameState.colors.push(generateRandomColor());
    }
    
    gameState.correctIndex = Math.floor(Math.random() * numColors);
    gameState.targetRgb = gameState.colors[gameState.correctIndex];
    gameState.isGameOver = false;
    
    updateDisplay();
    createColorBoxes();
    updateMessage('Click the color that matches the RGB value above!', 'info');
}

// Update display elements
function updateDisplay() {
    scoreElement.textContent = gameState.score;
    streakElement.textContent = gameState.streak;
    targetRgbElement.textContent = gameState.targetRgb;
    
    // Update grid class
    colorGridElement.className = `color-grid ${gameState.difficulty}`;
    
    // Update difficulty button
    difficultyBtn.textContent = gameState.difficulty === 'easy' 
        ? 'Easy (3 colors)' 
        : 'Hard (6 colors)';
    difficultyBtn.className = gameState.difficulty === 'hard' 
        ? 'btn btn-solid' 
        : 'btn btn-outline';
}

// Create color boxes
function createColorBoxes() {
    colorGridElement.innerHTML = '';
    
    gameState.colors.forEach((color, index) => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.innerHTML = `
            <div class="color-square" style="background-color: ${color}"></div>
            <div class="color-label">Color ${index + 1}</div>
        `;
        
        colorBox.addEventListener('click', () => handleColorClick(index));
        colorGridElement.appendChild(colorBox);
    });
}

// Handle color box click
function handleColorClick(index) {
    if (gameState.isGameOver) return;
    
    if (index === gameState.correctIndex) {
        // Correct answer
        const points = gameState.difficulty === 'hard' ? 20 : 10;
        gameState.score += points;
        gameState.streak += 1;
        gameState.isGameOver = true;
        
        updateDisplay();
        updateMessage(`Correct! 🎉 +${points} points`, 'success');
        
        // Change all boxes to correct color
        const colorSquares = document.querySelectorAll('.color-square');
        colorSquares.forEach(square => {
            square.style.backgroundColor = gameState.targetRgb;
        });
        
        // Auto-start new game after 2 seconds
        setTimeout(() => {
            initializeGame();
        }, 2000);
    } else {
        // Wrong answer
        gameState.streak = 0;
        updateDisplay();
        updateMessage('Try again! That\'s not quite right.', 'error');
        
        // Change clicked box to dark color
        const colorSquares = document.querySelectorAll('.color-square');
        colorSquares[index].style.backgroundColor = '#232323';
    }
}

// Update game message
function updateMessage(message, type) {
    gameMessageElement.textContent = message;
    gameMessageElement.className = `message ${type}`;
}

// Toggle difficulty
function toggleDifficulty() {
    gameState.difficulty = gameState.difficulty === 'easy' ? 'hard' : 'easy';
    initializeGame();
}

// Reset game
function resetGame() {
    gameState.score = 0;
    gameState.streak = 0;
    initializeGame();
}

// Event listeners
difficultyBtn.addEventListener('click', toggleDifficulty);
resetBtn.addEventListener('click', resetGame);

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});