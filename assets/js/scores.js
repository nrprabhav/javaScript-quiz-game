ol = document.querySelector('#highscores');
clear = document.querySelector('#clear');

function populatePage() {
    let highScoreNames = JSON.parse(localStorage.getItem('highScoreNames'));
    let highScores = JSON.parse(localStorage.getItem('highScores'));

    for (let i = 0; i < highScores.length; i++) {
        let name = highScoreNames[i];
        let score = highScores[i];
        let li = document.createElement("li");
        li.textContent = name + ":" + score;
        ol.appendChild(li);
        console.log(highScoreNames[i]);
        console.log(highScores[i]);
    }
}

populatePage();
