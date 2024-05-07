document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
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