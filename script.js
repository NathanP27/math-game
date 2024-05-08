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

    function showToast(text) {
        const toastBody = document.getElementById('toastBody');
        toastBody.textContent = text;
        $('#feedbackToast').toast({ delay: 2000 }); // Set the delay for the toast to disappear
        $('#feedbackToast').toast('show'); // Show the toast
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerElement.value, 10);
        if (userAnswer === correctAnswer) {
            showFeedback('Correct!');
            score++;
            scoreElement.textContent = score;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreElement.textContent = highScore;
            }
        } else {
            showFeedback('Wrong! Try again.');
        }
        correctAnswer = generateQuestion();
        answerElement.value = '';
    }

    let correctAnswer = generateQuestion();

    submitButton.addEventListener('click', checkAnswer);

    // Event listener for the answer input to handle the Enter key
    answerElement.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});