document.addEventListener('DOMContentLoaded', function() {
    let score = 0;

    let highScore = localStorage.getItem('highScore') || 0; // Retrieve high score from localStorage
    const highScoreElement = document.getElementById('high-score-display'); // Create a new element to display the high score
    highScoreElement.textContent = `High Score: ${highScore}`;
    document.getElementById('game-container').appendChild(highScoreElement); // Append the high score element to the game container

    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;

    let correctAnswer = generateQuestion();

    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operation = Math.random() < 0.5 ? 'add' : 'multiply'; // Randomly choose operation
        let correctAnswer;
    
        if (operation === 'add') {
            questionElement.textContent = `What is ${num1} + ${num2}?`;
            correctAnswer = num1 + num2;
        } else {
            questionElement.textContent = `What is ${num1} × ${num2}?`; // Use the multiplication symbol (×)
            correctAnswer = num1 * num2;
        }
    
        return correctAnswer;
    }

    document.getElementById('submit-answer').addEventListener('click', function() {
        const userAnswer = parseInt(document.getElementById('answer').value, 10); // Ensure you have an input with id 'answer'
        const feedbackElement = document.getElementById('feedback'); // Ensure you have this element in your HTML
        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            score++;
            scoreElement.textContent = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreElement.textContent = highScore;
            }
        } else {
            feedbackElement.textContent = 'Wrong! Try again.';
        }
        correctAnswer = generateQuestion(); // Generate a new question after each submission
        document.getElementById('answer').value = ''; // Clear the answer input
    });
});