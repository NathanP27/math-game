document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        questionElement.textContent = `What is ${num1} + ${num2}?`;
        return num1 + num2;
    }

    let correctAnswer = generateQuestion();

    document.getElementById('submit-answer').addEventListener('click', function() {
        const userAnswer = parseInt(answerElement.value, 10);
        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            score++;
        } else {
            feedbackElement.textContent = 'Wrong! Try again.';
        }
        scoreElement.textContent = score;
        correctAnswer = generateQuestion();
        answerElement.value = '';
    });
});