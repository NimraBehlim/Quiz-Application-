const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which HTML element is used for the largest heading?",
        choices: ["<heading>", "<h6>", "<h1>", "<header>"],
        answer: "<h1>"
    },
    {
        question: "Q. Which HTML tag is used to define an internal style sheet?",
        choices: [ "<style>", "<script>", "<css>", "<link>"],
        answer: "<style>"
    },
    {
        question: "Q. Which CSS property controls the text size?",
        choices:["font-size", "text-size", "font-style", "text-style"],
        answer: "font-size"
    },
    {
        question: "Q. How do you create a function in JavaScript?",
        choices: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function => myFunction()"],
        answer: "function myFunction()"
    },
    {
        question: "Q. What does CSS stand for?",
        choices: ["Common Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
        answer: "Cascading Style Sheet"
    },
    {
        question: "Q. What does HTML stand for?",
        choices: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the correct HTML element for inserting a line break?",
        choices: ["<br>", "<break>", "<lb>", "<newline>"],
        answer: "<br>"
    },
    {
        question: "Q. What does PHP stand for?",
        choices: ["Hypertext Preprocessor", "Hypertext Programming", "Hypertext Preprogramming", "Hometext Preprocessor"],
        answer: "Hypertext Preprocessor"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 20;
let timerID = null;

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 20;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);
}

const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if (confirmUser) {
                timeLeft = 20;
                startQuiz();
            }
            else {
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

const stopTimer = () => {
    clearInterval(timerID);
}

const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

const startQuiz = () => {
    timeLeft = 20;
    timer.style.display = "flex";
    shuffleQuestions();
}

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});