let btnStart = document.querySelector("#start");
let timeDisplay = document.querySelector("#time");
let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let questionTitle = document.querySelector("#question-title");
let choices = document.querySelector("#choices");

var secondsLeft = 60;

function setTime() {
    // Sets interval in variable

    secondsLeft = 60;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeDisplay.textContent = secondsLeft;

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            //sendMessage();
        }

    }, 1000);
}

btnStart.addEventListener("click", function(){
    startScreen.setAttribute("class","hide");
    let currentQuestion = questions[Math.floor(Math.random() * 10)];
    questionTitle.textContent = currentQuestion.title;
    let ol = document.createElement("ol");
    for(i=0; i<currentQuestion.choices.length; i++){
        let choiceText = currentQuestion.choices[i];
        let li = document.createElement("li");
        li.textContent = choiceText;
        ol.appendChild(li);
    }
    choices.appendChild(ol);
    questionScreen.setAttribute("class","start");
    setTime();
})