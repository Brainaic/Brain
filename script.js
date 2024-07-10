const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correct: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        correct: 2
    },
    // add more questions here
];

let studentName = "";
let score = 0;
let timeRemaining = 1 * 60; // 30 minutes in seconds
let timerInterval;

document.getElementById("student-info").addEventListener("submit", (e) => {
    e.preventDefault();
    studentName = document.getElementById("name").value;
    renderQuestions();
    startTimer();
});

function renderQuestions() {
    const questionsContainer = document.getElementById("questions-container");
    questionsContainer.innerHTML = "";
    questions.forEach((question, index) => {
        const questionHTML = `
            <div class="question">
                <h2>${question.question}</h2>
                <ul>
                    ${question.options.map((option, i) => `
                        <li>
                            <input type="radio" name="question-${index}" value="${i}">
                            <label>${option}</label>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `;
        questionsContainer.innerHTML += questionHTML;
    });
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", checkAnswers);
    questionsContainer.appendChild(submitButton);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById("timer").textContent = `Time remaining: ${minutes} minutes ${seconds} seconds`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            checkAnswers();
        }
    }, 1000);
}

function checkAnswers() {
    score = 0;
    questions.forEach((question, index) => {
        const answer = document.querySelector(`input[name="question-${index}"]:checked`);
        if (answer && answer.value == question.correct) {
            score++;
        }
    });
    displayResults();
}

function displayResults() {
    const resultsHTML = `
        <h1>Thank you, ${studentName}, for completing!</h1>
        <p>Your score is ${score} out of ${questions.length}.</p>
    `;
    document.getElementById("questions-container").innerHTML = resultsHTML;
    sendResultsToAdmin();
}

function sendResultsToAdmin() {
    fetch('/send_results.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentName: studentName,
            score: score,
            totalQuestions: questions.length
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
