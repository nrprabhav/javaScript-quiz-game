let btnStart = document.querySelector("#start");
let timeDisplay = document.querySelector("#time");
let startScreen = document.querySelector("#start-screen");
let questionScreen = document.querySelector("#questions");
let questionTitle = document.querySelector("#question-title");
let choices = document.querySelector("#choices");
let currentQuestion;
let ol;

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
})

questionScreen.addEventListener("click", function(event) {
    if(event.target.textContent === currentQuestion.answers){
        console.log("Corrent");
    }else{
        console.log("Wrong");
        secondsLeft -= 10;
    }
    ol.remove();
    displayQuestion();
})