document.addEventListener('DOMContentLoaded', function() {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const feedbackElement = document.getElementById('feedback');

    let score = 0;
    let highScore = localStorage.getItem('highScore') || 0;
    highScoreElement.textContent = highScore;

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 100) + 1;
        const num2 = Math.floor(Math.random() * 100) + 1;
        const operation = Math.random() < 0.5 ? 'add' : 'multiply';
        let correctAnswer;

        if (operation === 'add') {
            questionElement.textContent = `What is ${num1} + ${num2}?`;
            correctAnswer = num1 + num2;
        } else {
            questionElement.textContent = `What is ${num1} × ${num2}?`;
            correctAnswer = num1 * num2;
        }

        return correctAnswer;
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerElement.value, 10);
        if (userAnswer === correctAnswer) {
            alert('Correct!'); // Popup for correct answer
            score++;
            scoreElement.textContent = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreElement.textContent = highScore;
            }
        } else {
            alert('Wrong! Try again.'); // Popup for wrong answer
        }
        correctAnswer = generateQuestion();
        answerElement.value = '';
        answerElement.focus(); // Refocus on the answer input
    }

    let correctAnswer = generateQuestion();

    submitButton.addEventListener('click', checkAnswer);

    // Add event listener for the 'keyup' event on the answer input
    answerElement.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});