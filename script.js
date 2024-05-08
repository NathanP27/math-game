const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const levelEl = document.getElementById('level');
const timerEl = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');

let score = 0;
let highScore = 0;
let level = 1;
let currentQuestion;
let timer;
let timeLimit = 10; // Adjust time limit as desired

function generateQuestion() {
    const num1 = Math.floor(Math.random() * (level * 10)) + 1;
    const num2 = Math.floor(Math.random() * (level * 10)) + 1;
    currentQuestion = { num1, num2 };
    questionEl.textContent = `${num1} x ${num2}`;
    answerEl.value = '';
    answerEl.focus();
    startTimer();
    progressBar.setAttribute('aria-valuenow', 0);
    progressBar.classList.remove('bg-success', 'bg-danger');
}

clearInterval(timer); // Ensures timer doesn't stack
timer = setInterval(() => {
    timeLimit--;
    timerEl.textContent = `Time: ${timeLimit}s`;
    progressBar.setAttribute('aria-valuenow', (100 - (timeLimit / 10) * 100));
    if (timeLimit === 0) {
        checkAnswer(false); // Out of time
    }
}, 1000);

function updateAverageScore() {
    let totalScore = parseInt(localStorage.getItem('totalScore')) || 0;
    let sessionsPlayed = parseInt(localStorage.getItem('sessionsPlayed')) || 0;
    let averageScore = (sessionsPlayed > 0) ? (totalScore / sessionsPlayed).toFixed(2) : 0;
    document.getElementById('average-score').textContent = averageScore;
}

function checkAnswer(isAnswerCorrect) {
    clearInterval(timer);
    const userAnswer = parseInt(answerEl.value);
    const correctAnswer = currentQuestion.num1 * currentQuestion.num2;
    feedbackEl.textContent = isAnswerCorrect ? 'Correct!' : `Incorrect. The answer is ${correctAnswer}`;
    if (isAnswerCorrect) {
        score++;
        scoreEl.textContent = score;
        progressBar.classList.add('bg-success');
        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
        }
        levelUp();

        // Update total score and sessions played in local storage
        let totalScore = parseInt(localStorage.getItem('totalScore')) || 0;
        let sessionsPlayed = parseInt(localStorage.getItem('sessionsPlayed')) || 0;
        localStorage.setItem('totalScore', totalScore + score);
        localStorage.setItem('sessionsPlayed', sessionsPlayed + 1);

        // Update the average score display
        updateAverageScore();

        // Update score history in local storage
        let scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];
        scoreHistory.push(score);
        localStorage.setItem('scoreHistory', JSON.stringify(scoreHistory));

        // Update the progress graph
        renderProgressGraph();
    } else {
        progressBar.classList.add('bg-danger');
    }
    answerEl.value = '';
    setTimeout(generateQuestion, 1000); // Delay for feedback visibility
}

function levelUp() {
    if (score % 5 === 0) {
        level++;
        levelEl.textContent = level;
        timeLimit += 2; // Increase time limit for harder levels

        // Increment levels completed in local storage
        let levelsCompleted = parseInt(localStorage.getItem('levelsCompleted')) || 0;
        localStorage.setItem('levelsCompleted', levelsCompleted + 1);

        // Update levels completed display
        document.getElementById('levels-completed').textContent = levelsCompleted + 1;
    }
}

function renderProgressGraph() {
    // Fetch data from local storage or initialize it if not present
    let scoreHistory = JSON.parse(localStorage.getItem('scoreHistory')) || [];

    // Create a new Chart instance
    new Chart(document.getElementById('progress-graph'), {
        type: 'line',
        data: {
            labels: scoreHistory.map((_, index) => `Session ${index + 1}`),
            datasets: [{
                label: 'Score',
                data: scoreHistory,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call renderProgressGraph when the game loads to display the current graph
document.addEventListener('DOMContentLoaded', renderProgressGraph);

// Call updateAverageScore when the game loads to display the current average score
document.addEventListener('DOMContentLoaded', updateAverageScore);

document.getElementById('reset-btn').addEventListener('click', () => {
    localStorage.clear();
    score = 0;
    level = 1;
    scoreEl.textContent = score;
    levelEl.textContent = level;
    updateAverageScore();
    document.getElementById('levels-completed').textContent = 0;
    // Reset any other game state as necessary
});

submitBtn.addEventListener('click', () => {
    checkAnswer(answerEl.value === '' ? false : parseInt(answerEl.value) === currentQuestion.num1 * currentQuestion.num2);
});

answerEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkAnswer(answerEl.value === '' ? false : parseInt(answerEl.value) === currentQuestion.num1 * currentQuestion.num2);
    }
});

// Add sounds effects (optional)
// You can use libraries or create audio elements for correct/incorrect sounds

generateQuestion(); // Start the game
