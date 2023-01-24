// Logic required to display the highscores


// Connecting the HTML elements to javascript
let ol = document.querySelector('#highscores');
let clear = document.querySelector('#clear');

function populatePage() {
    // Read highscores from local storage and display on the page

    let highScoreNames = JSON.parse(localStorage.getItem('highScoreNames'));
    if(highScoreNames==null){
        highScoreNames=[];
    }
    let highScores = JSON.parse(localStorage.getItem('highScores'));
    if(highScores==null){
        highScores=[];
    }

    for (let i = 0; i < highScores.length; i++) {
        let name = highScoreNames[i];
        let score = highScores[i];
        let li = document.createElement("li");
        li.textContent = name + ":" + score;
        ol.appendChild(li);
    }
}

populatePage();

clear.addEventListener("click", function(){
    // Functionality to clear the highscores
    
    localStorage.removeItem('highScoreNames');
    localStorage.removeItem('highScores');
    ol.remove();
    populatePage();
});
