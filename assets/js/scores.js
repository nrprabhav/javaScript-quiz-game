let ol = document.querySelector('#highscores');
let clear = document.querySelector('#clear');

function populatePage() {
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
    localStorage.removeItem('highScoreNames');
    localStorage.removeItem('highScores');
    ol.remove();
    populatePage();
});
