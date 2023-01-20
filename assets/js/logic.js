let btnStart = document.querySelector("#start");
let timeDisplay = document.querySelector("#time");
let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let questionTitle = document.querySelector("#question-title");
let choices = document.querySelector("#choices");
let finalScore = document.querySelector("#final-score");
let endScreen = document.querySelector("#end-screen");
let submit = document.querySelector("#submit");
let initials = document.querySelector("#initials");
let audioCorrect = new Audio("./assets/sfx/correct.wav");
let audioIncorrect = new Audio("./assets/sfx/incorrect.wav");

let questionNumber = 0;
let currentQuestion;
let ol;
let score = 0;
let highScoreNames = [];
let highScores = [];

var secondsLeft = 60;

function setTime() {
    // Sets interval in variable

    secondsLeft = 60;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeDisplay.textContent = secondsLeft;

        if (secondsLeft <= 0 || questionNumber >= 10) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            displayScore();
        }

    }, 1000);
}

function restartQuiz(){
    score = 0;
    questionScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "start");
    ol.remove();
    timeDisplay.textContent = 0;
}

function displayScore() {
    questionScreen.setAttribute("class", "hide");
    finalScore.textContent = score;
    endScreen.setAttribute("class", "show");
}

function displayQuestion() {
    startScreen.setAttribute("class", "hide");
    console.log(questionNumber);
    if (questionNumber < 10) {
        currentQuestion = questions[questionNumber];
        questionTitle.textContent = currentQuestion.title;
        ol = document.createElement("ol");
        for (i = 0; i < currentQuestion.choices.length; i++) {
            let choiceText = currentQuestion.choices[i];
            let li = document.createElement("li");
            li.textContent = choiceText;
            ol.appendChild(li);
        }
        choices.appendChild(ol);
        questionScreen.setAttribute("class", "show");
    }
}

btnStart.addEventListener("click", function () {
    questionNumber = 0;
    displayQuestion();
    setTime();
});

questionScreen.addEventListener("click", function (event) {
    if (event.target.textContent === currentQuestion.answers) {
        audioCorrect.play();
        console.log("Corrent");
        score += 5;
    } else {
        audioIncorrect.play();
        console.log("Wrong");
        secondsLeft -= 10;
    }
    questionNumber++;
    questionScreen.setAttribute("class", "hide");
    ol.remove();
    displayQuestion();
});

submit.addEventListener("click", function(){
    if(initials.value.length>0 && initials.value.length<=3){
        highScoreNames = JSON.parse(localStorage.getItem('highScoreNames'));
        if(highScoreNames==null){
            highScoreNames=[];
        }
        highScores = JSON.parse(localStorage.getItem('highScores'));
        if(highScores==null){
            highScores=[];
        }
        highScoreNames.push(initials.value);
        highScores.push(score);
        localStorage.setItem('highScoreNames',JSON.stringify(highScoreNames));
        localStorage.setItem('highScores',JSON.stringify(highScores));
        restartQuiz();
    }
})
