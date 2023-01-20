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

        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            displayScore();
        }

    }, 1000);
}

function displayScore() {
    questionScreen.setAttribute("class","hide");
    finalScore.textContent=score;
    endScreen.setAttribute("class","show");
}

function displayQuestion() {
    startScreen.setAttribute("class","hide");
    currentQuestion = questions[Math.floor(Math.random() * 10)];
    questionTitle.textContent = currentQuestion.title;
    ol = document.createElement("ol");
   //ol.innerHTML = "";
    for(i=0; i<currentQuestion.choices.length; i++){
        let choiceText = currentQuestion.choices[i];
        let li = document.createElement("li");
        li.textContent = choiceText;
        ol.appendChild(li);
    }
    choices.appendChild(ol);
    questionScreen.setAttribute("class","start");
}

btnStart.addEventListener("click", function(){
    displayQuestion();
    setTime();
});

questionScreen.addEventListener("click", function(event) {
    if(event.target.textContent === currentQuestion.answers){
        console.log("Corrent");
        score += 5;
    }else{
        console.log("Wrong");
        secondsLeft -= 10;
    }
    ol.remove();
    displayQuestion();
});
/*
submit.addEventListener("click", function(){
    if(initials.value
    highScoreNames.append();
    localStorage.
})
*/