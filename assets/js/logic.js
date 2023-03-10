// Logic required to run the quiz and store the scores

// Connecting the HTML elements to javascript
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
let error = document.querySelector("#error");
let audioCorrect = new Audio("./assets/sfx/correct.wav");
let audioIncorrect = new Audio("./assets/sfx/incorrect.wav");

//Variables
let questionNumber = 0;
let currentQuestion;
let ol;
let score = 0;
let highScoreNames = [];
let highScores = [];
let a;

var secondsLeft = 60;


function setTime() {
    // Sets interval in variable

    secondsLeft = 60;
    timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft >= 0)
            timeDisplay.textContent = secondsLeft;
        else
            timeDisplay.textContent = 0;

        if (secondsLeft <= 0 || questionNumber >= 10) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            displayScore();
        }

    }, 1000);
}

function restartQuiz(){
    // Restart quiz after timeout or if the questions are over

    // Resetting the relevant variables for a new attempt at the quiz
    score = 0;
    questionScreen.setAttribute("class", "hide");
    endScreen.setAttribute("class", "hide");
    startScreen.setAttribute("class", "start");
    ol.remove();
    timeDisplay.textContent = 0;
}

function displayScore() {
    // Display score in the end quiz screen

    questionScreen.setAttribute("class", "hide");
    finalScore.textContent = score;
    endScreen.setAttribute("class", "show");
}

function displayQuestion() {
    // Display quiz questions during the quiz

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

function sortWithIndeces(toSort) {
    // Sort values in an array and keep note of the indices

    for (var i = 0; i < toSort.length; i++) {
      toSort[i] = [toSort[i], i];
    }
    toSort.sort(function(left, right) {
      return left[0] < right[0] ? 1 : -1;
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
      toSort.sortIndices.push(toSort[j][1]);
      toSort[j] = toSort[j][0];
    }
    return toSort;
}

btnStart.addEventListener("click", function () {
    // Start quiz button

    questionNumber = 0;
    displayQuestion();
    setTime();
});

questionScreen.addEventListener("click", function (event) {
    // Action when an option is selected

    if (event.target.textContent === currentQuestion.answers) {
        // Correct answers
        audioCorrect.play();
        console.log("Corrent");
        score += 5;
    } else {
        // Wrong answers
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
    // Action when user wants to store the score

    if(initials.value.length>0 && initials.value.length<=3){
        // Reading from local storage
        highScoreNames = JSON.parse(localStorage.getItem('highScoreNames'));
        if(highScoreNames==null){
            highScoreNames=[];
        }
        highScores = JSON.parse(localStorage.getItem('highScores'));
        if(highScores==null){
            highScores=[];
        }
        // Adding the new score and new initials
        highScoreNames.push(initials.value);
        highScores.push(score);
        // Arranging the scores in descending order
        a = sortWithIndeces(highScores);
        let temp=[];
        for(i=0; i<highScoreNames.length; i++){
            temp.push(highScoreNames[a.sortIndices[i]]);
        }
        // Storing in local storage
        localStorage.setItem('highScoreNames',JSON.stringify(temp));
        localStorage.setItem('highScores',JSON.stringify(a));
        // Restarting the quiz
        restartQuiz();
    }else{
        if(initials.value.length>3)
            error.textContent = "Error: Initials have to be 3 or less characters long";
        if(initials.value.length==0)
            error.textContent = "Error: Initials cannot be an empty string";
    }
})
