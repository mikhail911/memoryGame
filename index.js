let timeLeft = 240;
let timer;
let count = 0;
let clicksCount = 0;
let previousTarget = null;
let firstGuess = "";
let secondGuess = "";
let delay = 1000;
let matchCount = 0;
let startedByClick = false; 
let gameStart = false;

const progressBar       = document.getElementById("progressBar");
const timeLeftStatus    = document.getElementById("timeLeftStatus");
const progressStatus    = document.getElementById("progressStatus");
const startButton       = document.getElementById("startButton");
const pairsFoundVal     = document.getElementById("pairsFoundVal");
const pairsNotFoundVal  = document.getElementById("pairsNotFoundVal");
const totalClickVal     = document.getElementById("totalClickVal");
const hideMe            = document.getElementById("summary")
const game              = document.getElementById('game');
const grid              = document.createElement('section');
const valval            = document.getElementsByClassName("gridItem")[0];
const val1              = document.getElementsByClassName("val1")[0];
const val2              = document.getElementsByClassName("val2")[0];
const val3              = document.getElementsByClassName("val3")[0];
const val4              = document.getElementsByClassName("val4")[0];
const val5              = document.getElementsByClassName("val5")[0];
const closeButton       = document.getElementById("buttonArea");

grid.setAttribute('class', 'grid');
game.appendChild(grid);

startButton.addEventListener("click", startGame);
closeButton.addEventListener("click", function() {
    hideMe.classList.add("hideMe");
});
timeLeftStatus.innerHTML = "Time left: " + Math.floor(timeLeft / 60) + " minutes " + timeLeft % 60 + " seconds";

var gameCard = [
    {
        'name': 'beer',
        'img': 'img/cards/beer-solid.svg'
    },
    {
        'name': 'bug',
        'img': 'img/cards/bug-solid.svg'
    },
    {
        'name': 'car',
        'img': 'img/cards/car-solid.svg'
    },
    {
        'name': 'drum',
        'img': 'img/cards/drum-solid.svg'
    },
    {
        'name': 'graduation',
        'img': 'img/cards/graduation-cap-solid.svg'
    },
    {
        'name': 'home',
        'img': 'img/cards/home-solid.svg'
    },
    {
        'name': 'hospital',
        'img': 'img/cards/hospital-solid.svg'
    },
    {
        'name': 'laptop',
        'img': 'img/cards/laptop-solid.svg'
    },
    {
        'name': 'lemon',
        'img': 'img/cards/lemon-solid.svg'
    },
    {
        'name': 'magnet',
        'img': 'img/cards/magnet-solid.svg'
    }
];

refreshCards(); 

function refreshCards() {
    if (grid.hasChildNodes) {
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
            }
    }

    var gameGrid = gameCard.concat(gameCard).sort(function () {
        return 0.5 - Math.random();
    });

    gameGrid.forEach(function(item) {
        var name = item.name,
            img = item.img;

        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;

        var front = document.createElement('div');
        front.classList.add('front');

        var back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = 'url(' + img + ')';

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });
}

function startGame() {
    if (gameStart === false) {
        gameStart = true;
        startedByClick = true;
        matchCount = 0;
        clicksCount = 0;
        timeLeft = 240;
        timer = setInterval(countdown, 2400);
        startButton.innerHTML = "Stop";
        startButton.classList.remove("green");
        startButton.classList.add("red");
        refreshCards();
    } else {
        stopGame();
    }
}

function stopGame() {
    gameStart = false;
    hideMe.classList.remove("hideMe");
    summary();
    clearTimeout(timer);
    timeLeft = 240;
    startButton.innerHTML = "Start";
    startButton.classList.remove("red");
    startButton.classList.add("green");
    progressStatus.classList.remove("red");
    progressStatus.classList.add("green");
}

function countdown() {
    startButton.classList.add("green");
    if (timeLeft == 0) {
        stopGame();
    }
    if (timeLeft <= 50 && timeLeft >= 2) { 
        progressStatus.style = "width: " + (timeLeft / 120) * 100 + "%;"; 
        progressStatus.classList.remove("green");
        progressStatus.classList.add("orange");
    }
    if (timeLeft <= 20) { 
        progressStatus.style = "width: " + (timeLeft / 120) * 100 + "%;"; 
        progressStatus.classList.remove("orange");
        progressStatus.classList.add("red");}
    else {     
        progressStatus.style = "width: " + (timeLeft / 120) * 100 +"%;"; 
        progressStatus.classList.add("green");
    }
    if (matchCount === 10) {
        stopGame();
    }

    timeLeftStatus.innerHTML = "Time left: " + Math.floor(timeLeft / 60) + " minutes " + timeLeft % 60 + " seconds";
    timeLeft--;
}

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

const match = () => {
    matchCount++;
    pairsFoundVal.innerHTML = matchCount;
    pairsNotFoundVal.innerHTML = 10 - matchCount;
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

grid.addEventListener("click", function(event){
    var clickedCard = event.target;
    
    if (startedByClick === false) {
        startedByClick = true;
        startGame();
    } else {
        if (clickedCard.nodeName === 'SECTION' ||
            clickedCard === previousTarget ||
            clickedCard.parentNode.classList.contains('selected') ||
            clickedCard.parentNode.classList.contains('match')) {
                return console.log(clickedCard.nodeName);
        }

        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clickedCard.parentNode.dataset.name;
                clickedCard.parentNode.classList.add('selected');
                clicksCount++;
                totalClickVal.innerHTML = clicksCount;
            } else {
                secondGuess = clickedCard.parentNode.dataset.name;
                clickedCard.parentNode.classList.add('selected');
                clicksCount++;
                totalClickVal.innerHTML = clicksCount;
            }

            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay);
            }
            previousTarget = clickedCard;
        }
    }
    console.log(clicksCount);
});

function summary() {
    percent = (matchCount / 10) * 100;
    val1.innerHTML = percent + "%";
    if (percent <= 10) {
        val1.classList.add("red");
        valval.classList.add("red");
    } 
    if (percent > 10 && percent <= 50) {
        val1.classList.add("orange");
        valval.classList.add("orange");
    } else {
        val1.classList.add("green");
        valval.classList.add("green");
    }
    val2.innerHTML = matchCount;
    val3.innerHTML = 10 - matchCount;
    val4.innerHTML = clicksCount;
    timePlay = 240 - timeLeft;
    if (timeLeft % 60 === 0) {
        console.log(timePlay);
        val5.innerHTML = Math.floor(timePlay / 60) + " minutes 0 seconds";
    } else {
        console.log(timePlay);
        val5.innerHTML = Math.floor(timePlay / 60) + " minutes " + ((timePlay % 60) - 1) + " seconds";
    }
}