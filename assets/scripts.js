document.querySelectorAll("div.options > button").forEach(item => {
    item.addEventListener("click", handleClick);
})
var startEl = document.getElementById("start-quiz").addEventListener("click", startQuiz);
var submitEl = document.getElementById("submit").addEventListener("click", submitHighscore, { once: true });
var highscoreLink = document.getElementById("highscore-link").addEventListener("click", showHighScores, { once: true });
var startAgainEl = document.getElementById("start-again");

startAgainEl.addEventListener("click", refreshPage);


var user = {
    score: 0,
    name: "",
}

var questionCount = 1;
var questionQuant = document.querySelectorAll(".question");
var timerCount = 60;
var welcomeEl = document.getElementById("welcome");
var firstQuestionEl = document.getElementById("q1");
var getReadyEl = document.getElementById("get-ready");
var userScoreEL = document.querySelector("#highscore > p");
var highscoreListEl = document.getElementById("highscore-list");
var storedHighscoreList = [];


if (("highscoreList" in localStorage)) {
    storedHighscoreList = JSON.parse(localStorage.highscoreList)
}


function handleClick(event) {
    target = event.target;
    resultEl = document.createElement("p");
    target.parentNode.appendChild(resultEl);
    if (target.getAttribute("data-result") == "correct") {
        user.score += 1;
        resultEl.textContent = "Correct!";
    }
    else {
        resultEl.textContent = "Incorrect!";
        timerCount -= 5;
    }
    nextQuestion();
}

function nextQuestion() {
    var currentQuestion = document.getElementById("q" + questionCount);
    currentQuestion.setAttribute("style", "visibility:hidden");
    questionCount++;
    if (questionCount <= questionQuant.length) {
        var nextQuestion = document.getElementById("q" + questionCount);
        nextQuestion.setAttribute("style", "visibility:visible");
    }
}

function showHighScores() {
    welcomeEl.setAttribute("style", "visibility:hidden")
    startAgainEl.setAttribute("style", "visibility:visible")

    for (var i = 0; i < storedHighscoreList.length; i++) {
        var storedHighscore = document.createElement("p");
        storedHighscore.textContent = storedHighscoreList[i].name + " got a score of " + storedHighscoreList[i].score;
        highscoreListEl.appendChild(storedHighscore);
    }


    for (var i = 0; i < questionQuant.length; i++) {
        questionQuant[i].setAttribute("style", "visibility:hidden")

    }
    userScoreEL.textContent = "Your final score is " + user.score + "!";
    var highscoreEl = document.getElementById("highscore");
    highscoreEl.setAttribute("style", "visibility:visible");


}

function startQuiz() {
    getReadyEl.setAttribute("style", "visibility:visible");
    welcomeEl.setAttribute("style", "visibility:hidden");
    firstQuestionEl.setAttribute("style", "visibility:visible; transition-delay:1000ms");

    var timeInterval = setInterval(function () {
        getReadyEl.setAttribute("style", "visbility:hidden");

        var timerEl = document.getElementById("timer");
        timerEl.textContent = "Time: " + timerCount;
        if (timerCount <= 0 || questionCount > questionQuant.length) {
            clearInterval(timeInterval);
            showHighScores();
            timerEl.textContent = "";
        }
        timerCount--;
    }, 1000)
}

function submitHighscore() {
    user.name = document.getElementById("initials").value;
    storedHighscoreList.push(user);
    localStorage.highscoreList = JSON.stringify(storedHighscoreList);
    var newHighscoreEl = document.createElement("p");
    newHighscoreEl.textContent = user.name + " got a score of " + user.score;
    highscoreListEl.appendChild(newHighscoreEl);
}

function refreshPage() {
    location.reload();
}